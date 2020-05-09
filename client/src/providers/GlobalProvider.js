import React, { createContext, useContext, useState, useEffect } from "react";
import * as db from "../helpers/db";

const globalContext = createContext();
const { Provider } = globalContext;

const GlobalProvider = ({ children }) => {
  const [keywords, setKeywords] = useState([]);
  const [allAvailableKeywords, setAllAvailableKeywords] = useState([]);

  const getAllAvailableKeywords = async () => {
    setAllAvailableKeywords(await db.getAllKeywords());
  };

  useEffect(() => {
    getAllAvailableKeywords();
  }, []);

  const handleNewSearch = (searchTerm) => {
    setKeywords([...keywords, searchTerm]);
  };

  const handleRemoveKeyword = (keywordToRemove) => {
    setKeywords(keywords.filter((keyword) => keyword !== keywordToRemove));
  };

  const contextValue = {
    handleNewSearch,
    keywords,
    handleRemoveKeyword,
    allAvailableKeywords,
  };

  console.log({ keywords });
  return <Provider value={contextValue}>{children}</Provider>;
};

export default GlobalProvider;

export const useGlobalState = () => useContext(globalContext);
