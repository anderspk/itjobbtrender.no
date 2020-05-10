import React, { createContext, useContext, useState, useEffect } from "react";
import * as db from "../helpers/db";

const globalContext = createContext();
const { Provider } = globalContext;

const GlobalProvider = ({ children }) => {
  const [allAvailableKeywords, setAllAvailableKeywords] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [monthRange, setMonthRange] = useState(1);
  const [chartData, setChartData] = useState({});

  const getAllAvailableKeywords = async () => {
    setAllAvailableKeywords(await db.getAllKeywords());
  };

  useEffect(() => {
    getAllAvailableKeywords();
  }, []);

  const handleNewSearch = async (searchTerm) => {
    setKeywords([...keywords, searchTerm]);

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

  const handleRemoveKeyword = (keywordToRemove) => {
    setKeywords(keywords.filter((keyword) => keyword !== keywordToRemove));
    const chartDataCopy = { ...chartData };
    delete chartDataCopy[keywordToRemove];
    setChartData(chartDataCopy);
  };

  const handleNewMonthRange = async (newMonthRange) => {
    setMonthRange(newMonthRange);
    const chartDataWithNewMonthRange = await db.getMultipleKeywordsMonthsRange(
      keywords,
      monthRange
    );
    setChartData(chartDataWithNewMonthRange);
  };

  const contextValue = {
    handleNewSearch,
    keywords,
    handleRemoveKeyword,
    allAvailableKeywords,
    monthRange,
    handleNewMonthRange,
    chartData,
  };

  return <Provider value={contextValue}>{children}</Provider>;
};

export default GlobalProvider;

export const useGlobalState = () => useContext(globalContext);
