const fs = require("fs");
const cheerio = require("cheerio");
const axios = require("axios");

exports.fetchData = async (url) => {
  const SITE_URL =
    "https://www.finn.no/job/fulltime/search.html?hideConsentBox=&location=1.20001.20061&occupation=0.23";
  const result = await axios.get(url || SITE_URL);
  return cheerio.load(result.data);
};

exports.getKeywords = () =>
  new Set(
    fs
      .readFileSync("./filterlist.txt", "utf-8")
      .split("\r\n")
      .map((word) => word.toLowerCase())
  );

exports.getYesterdaysAdsUrls = ($) =>
  (yesterdaysAdsUrls = $("article.ads__unit")
    .map((i, el) => {
      if (
        $(".ads__unit__content__details", el).text().includes("1 dag siden")
      ) {
        return $("h2 a", el).attr("href");
      }
    })
    .get());

exports.getTotalDayKeywordCount = (yesterdaysAdPages, keywords) => {
  const totalDayKeywordCount = new Map();

  yesterdaysAdPages.forEach(($page) => {
    const keywordsOnPage = new Set();

    const textOnPage = $page(".grid__unit.u-r-size2of3").text().toLowerCase();

    keywords.forEach((keyword) =>
      textOnPage.includes(keyword) ? keywordsOnPage.add(keyword) : ""
    );

    console.log("keywordsOnPage", keywordsOnPage);
    keywordsOnPage.forEach((keyword) =>
      totalDayKeywordCount.set(
        keyword,
        totalDayKeywordCount.get(keyword)
          ? totalDayKeywordCount.get(keyword) + 1
          : 1
      )
    );
  });

  return totalDayKeywordCount;
};
