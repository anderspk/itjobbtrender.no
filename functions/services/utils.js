const fs = require("fs");
const cheerio = require("cheerio");
const axios = require("axios");

const fetchData = async (url) => {
  const result = await axios.get(url || SITE_URL);
  return cheerio.load(result.data);
};

exports.fetchPage = async (url) => await fetchData(url);

exports.getYesterdaysAdPages = async (yesterdaysAdsUrls) =>
  Promise.all(
    yesterdaysAdsUrls.map((url) => fetchData(`https://www.finn.no${url}`))
  );

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
