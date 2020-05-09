import React, { useState } from "react";
import "./SearchForm.scss";
import { useGlobalState } from "../../../../providers/GlobalProvider";
import AutoSuggest from "./components/AutoSuggest";

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { handleNewSearch, allAvailableKeywords } = useGlobalState();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleNewSearch(searchTerm);
    setSearchTerm("");
  };

  const filteredList = searchTerm
    ? allAvailableKeywords
        .filter((word) => word.startsWith(searchTerm))
        .splice(0, 5)
    : [];

  return (
    <div className="search-form">
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <AutoSuggest list={filteredList} />
    </div>
  );
};

export default SearchForm;
