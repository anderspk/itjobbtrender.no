const functions = require("firebase-functions");
const admin = require("firebase-admin");

// const serviceAccount = require("./admin.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const db = require("./services/db");
const {
  fetchData,
  getKeywords,
  getYesterdaysAdsUrls,
  getTotalDayKeywordCount,
} = require("./services/utils");

exports.scheduledFunction = functions.pubsub
  .schedule("every 10 minutes")
  .onRun((context) => {
    console.log("this will be run every 10 minutes");
    return null;
  });

// const fetchData = async (url) => {
//   const SITE_URL =
//     "https://www.finn.no/job/fulltime/search.html?hideConsentBox=&location=1.20001.20061&occupation=0.23";
//   const result = await axios.get(url || SITE_URL);
//   return cheerio.load(result.data);
// };

exports.isolatedFunction = functions.https.onRequest(async (req, res) => {
  const $ = await fetchData();
  const yesterdaysAdsUrls = getYesterdaysAdsUrls($);
  const yesterdaysAdPages = await Promise.all(
    yesterdaysAdsUrls.map((url) => fetchData(`https://www.finn.no${url}`))
  );
  // const yesterdaysAdsUrls = $("article.ads__unit")
  //   .map((i, el) => {
  //     if (
  //       $(".ads__unit__content__details", el).text().includes("1 dag siden")
  //     ) {
  //       return $("h2 a", el).attr("href");
  //     }
  //   })
  //   .get();

  // const keywords = new Set(
  //   fs
  //     .readFileSync("./filterlist.txt", "utf-8")
  //     .split("\r\n")
  //     .map((word) => word.toLowerCase())
  // );
  const keywords = getKeywords();

  // const totalDayKeywordCount = new Map();
  // console.log("hit", { yesterdaysAdsUrls });

  // const pages = await Promise.all(
  //   yesterdaysAdsUrls.map((url) => fetchData(`https://www.finn.no${url}`))
  // );

  // pages.forEach(($page) => {
  //   const keywordsOnPage = new Set();

  //   const textOnPage = $page(".grid__unit.u-r-size2of3").text().toLowerCase();

  //   keywords.forEach((keyword) =>
  //     textOnPage.includes(keyword) ? keywordsOnPage.add(keyword) : ""
  //   );

  //   console.log("keywordsOnPage", keywordsOnPage);
  //   keywordsOnPage.forEach((keyword) =>
  //     totalDayKeywordCount.set(
  //       keyword,
  //       totalDayKeywordCount.get(keyword)
  //         ? totalDayKeywordCount.get(keyword) + 1
  //         : 1
  //     )
  //   );
  // });

  const totalDayKeywordCount = getTotalDayKeywordCount(
    yesterdaysAdPages,
    keywords
  );
  console.log({ totalDayKeywordCount });

  totalDayKeywordCount.forEach(async (count, keyword) => {
    console.log({ count, keyword });
    await db.addKeyword(keyword, count);
  });
  console.log("Function complete");
  res.send("Completed");
});
