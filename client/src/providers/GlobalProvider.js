import React, { createContext, useContext, useState, useEffect } from "react";
import * as db from "../helpers/db";

const globalContext = createContext();
const { Provider } = globalContext;

const GlobalProvider = ({ children }) => {
  const [allKeywords, setAllKeywords] = useState([]);
  const [activeKeywords, setActiveKeywords] = useState([]);
  const [monthRange, setMonthRange] = useState(1);
  const [chartData, setChartData] = useState({});

  const getAllKeywords = async () => {
    setAllKeywords(await db.getAllKeywords());
  };

  useEffect(() => {
    getAllKeywords();
  }, []);

  const handleNewSearch = async (searchTerm) => {
    if (
      !allKeywords.includes(searchTerm) ||
      activeKeywords.includes(searchTerm)
    ) {
      return;
    }
    setActiveKeywords([...activeKeywords, searchTerm]);

    try {
      const keywordChartData = await db.getKeywordForMonthRange(
        searchTerm,
        monthRange
      );
      setChartData({ ...chartData, [searchTerm]: keywordChartData });
    } catch (error) {
      console.error(error);
    }
  };

  const handlePopularChoicePick = async (...choices) => {
    setActiveKeywords(choices);

    try {
      const KeywordsChartData = await Promise.all(
        choices.map((choice) => db.getKeywordForMonthRange(choice, monthRange))
      );

      const newChartData = {};
      choices.forEach(
        (choice, i) => (newChartData[choice] = KeywordsChartData[i])
      );
      setChartData(newChartData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveKeyword = (keywordToRemove) => {
    setActiveKeywords(
      activeKeywords.filter((keyword) => keyword !== keywordToRemove)
    );
    const chartDataCopy = { ...chartData };
    delete chartDataCopy[keywordToRemove];
    setChartData(chartDataCopy);
  };

  const handleNewMonthRange = async (newMonthRange) => {
    setMonthRange(newMonthRange);
    const chartDataWithNewMonthRange = await db.getMultipleKeywordsMonthsRange(
      activeKeywords,
      newMonthRange
    );
    setChartData(chartDataWithNewMonthRange);
  };

  const contextValue = {
    handleNewSearch,
    activeKeywords,
    handleRemoveKeyword,
    allKeywords,
    monthRange,
    handleNewMonthRange,
    chartData,
    handlePopularChoicePick,
  };

  return <Provider value={contextValue}>{children}</Provider>;
};

export default GlobalProvider;

export const useGlobalState = () => useContext(globalContext);
