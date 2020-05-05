const functions = require("firebase-functions");

const db = require("./services/db");
const {
  fetchPage,
  getYesterdaysAdPages,
  getKeywords,
  getYesterdaysAdsUrls,
  getTotalDayKeywordCount,
} = require("./services/utils");

exports.scheduledFunction = functions.pubsub
  .schedule("every 60 minutes")
  .onRun((context) => {
    console.log("this will be run every 10 minutes");
    return null;
  });

exports.isolatedFunction = functions.https.onRequest(async (req, res) => {
  const SITE_URL =
    "https://www.finn.no/job/fulltime/search.html?hideConsentBox=&location=1.20001.20061&occupation=0.23";

  const $ = await fetchPage(SITE_URL);
  const yesterdaysAdsUrls = getYesterdaysAdsUrls($);
  const yesterdaysAdPages = await getYesterdaysAdPages(yesterdaysAdsUrls);

  const keywords = getKeywords();

  const totalDayKeywordCount = getTotalDayKeywordCount(
    yesterdaysAdPages,
    keywords
  );

  for (const keyValue of totalDayKeywordCount) {
    // eslint-disable-next-line no-await-in-loop
    await db.addKeyword(keyValue[0], keyValue[1]);
  }

  res.send("Completed");
});
