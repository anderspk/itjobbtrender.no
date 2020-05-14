import React, { useState, useRef, useCallback } from "react";
import "./SearchForm.scss";
import { useGlobalState } from "../../../../providers/GlobalProvider";
import useClickOutside from "../../../../hooks/useClickOutside";

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [displaySuggestions, setDisplaySuggestions] = useState(true);
  const [filteredList, setFilteredList] = useState([]);
  const [focusOn, setFocusOn] = useState(-1);
  const [errorMessage, setErrorMessage] = useState("");

  const searchFormRef = useRef(null);

  const { handleNewSearch, allKeywords, activeKeywords } = useGlobalState();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (
      !allKeywords.includes(searchTerm) ||
      activeKeywords.includes(searchTerm)
    ) {
      setErrorMessage("Obs! Nøkkelord må være i listen");
      return;
    }
    handleNewSearch(searchTerm);
    setFocusOn(-1);
    setSearchTerm("");
    setFilteredList([]);
  };

  const handleClickOutside = useCallback(() => {
    setDisplaySuggestions(false);
    setFocusOn(-1);
  }, []);

  useClickOutside(searchFormRef, handleClickOutside);

  const handleKeyPress = (e) => {
    if (errorMessage) {
      setErrorMessage("");
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const newFocusOn =
        focusOn - 1 < 0 ? filteredList.length - 1 : focusOn - 1;
      setFocusOn(newFocusOn);
      setSearchTerm(filteredList[newFocusOn]);
      return;
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const newFocusOn = (focusOn + 1) % filteredList.length;
      setSearchTerm(filteredList[newFocusOn]);
      setFocusOn(newFocusOn);
      return;
    }
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    generateFilteredList(newSearchTerm);
  };

  const handleHover = (i) => {
    setFocusOn(i);
  };

  const handleSuggestionClick = () => {
    handleNewSearch(filteredList[focusOn]);
    setFocusOn(-1);
    setSearchTerm("");
    setFilteredList([]);
  };

  const generateFilteredList = (newSearchTerm) => {
    const currentSearchTerm = newSearchTerm || "";
    setFilteredList(
      allKeywords.filter(
        (word) =>
          word.startsWith(currentSearchTerm.toLowerCase()) &&
          !activeKeywords.includes(word)
      )
    );
  };

  return (
    <div className="search-form" ref={searchFormRef}>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          role="search"
          aria-label="Search"
          value={searchTerm}
          onChange={handleKeyPress}
          onKeyDown={handleKeyPress}
          placeholder="Søk"
          onFocus={() => {
            setDisplaySuggestions(true);
            generateFilteredList();
          }}
        />
      </form>
      <p className={`${errorMessage ? "error-message" : "hidden"}`}>
        {errorMessage}
      </p>
      <ul
        className={
          filteredList.length > 0 && displaySuggestions
            ? "auto-suggest"
            : "hidden"
        }
      >
        {filteredList.map((word, i) => (
          <li
            key={word}
            className={`suggestion ${i === focusOn ? "in-focus" : ""}`}
            onMouseEnter={() => handleHover(i)}
            onClick={handleSuggestionClick}
          >
            {word}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchForm;
