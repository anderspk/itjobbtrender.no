const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const axios = require("axios");

const fetchData = async (url) => {
  const result = await axios.get(url || SITE_URL);
  return cheerio.load(result.data);
};

exports.fetchPage = (url) => fetchData(url);

exports.getYesterdaysAdPages = (yesterdaysAdsUrls) =>
  Promise.all(
    yesterdaysAdsUrls.map((url) => fetchData(`https://www.finn.no${url}`))
  );

const getKeywords = () =>
  new Set(
    fs
      .readFileSync(path.resolve(process.cwd(), "./keywordsList.txt"), "utf-8")
      .replace(/(\r\n|\n|\r)/gm, "\n")
      .split("\n")
      .map((word) => {
        if (word.trim().length > 0) return word.toLowerCase();
      })
  );

exports.getYesterdaysAdsUrls = ($) =>
  $("article.ads__unit")
    .map((i, el) => {
      if (
        $(".ads__unit__content__details", el).text().includes("en dag siden")
      ) {
        return $("h2 a", el).attr("href");
      }
    })
    .get();

exports.getLastAdOnPageWasYesterday = ($) => {
  const lastAd = $("article.ads__unit").children().last();

  return $(".ads__unit__content__details", lastAd)
    .text()
    .includes("en dag siden");
};

exports.getTotalDayKeywordCount = (yesterdaysAdPages) => {
  const keywordsList = getKeywords();

  const totalDayKeywordCount = new Map();

  keywordsList.forEach((rawKeyword) => {
    if (!rawKeyword || !rawKeyword.trim()) {
      return;
    }

    let [keyword, variants] = rawKeyword.split("==");
    keyword = keyword.trim();

    variants = variants
      ? variants.split("||").map((keywordVariant) => keywordVariant.trim())
      : [keyword];

    totalDayKeywordCount.set(keyword, 0);

    yesterdaysAdPages.forEach(($page) => {
      const textOnPage = $page(".grid__unit.u-r-size2of3").text().toLowerCase();

      const containsAVariantOfKeyword = variants.some((variant) => {
        const variantContainsSpecialCharacter = [
          ".",
          "+",
          "#",
        ].some((specialCharacter) => variant.includes(specialCharacter));

        return variantContainsSpecialCharacter
          ? textOnPage.includes(variant)
          : textOnPage.match(new RegExp(`\\b${variant}\\b`));
      });

      if (containsAVariantOfKeyword) {
        totalDayKeywordCount.set(
          keyword,
          totalDayKeywordCount.get(keyword) + 1
        );
      }
    });
  });

  return totalDayKeywordCount;
};
