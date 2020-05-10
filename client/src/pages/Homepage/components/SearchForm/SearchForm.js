import React, { useState, useRef, useCallback } from "react";
import "./SearchForm.scss";
import { useGlobalState } from "../../../../providers/GlobalProvider";
import useClickOutside from "../../../../hooks/useClickOutside";

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [displaySuggestions, setDisplaySuggestions] = useState(true);
  const [filteredList, setFilteredList] = useState([]);
  const [focusOn, setFocusOn] = useState(-1);

  const searchFormRef = useRef(null);

  const { handleNewSearch, allAvailableKeywords } = useGlobalState();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!allAvailableKeywords.includes(searchTerm)) {
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
    if (!displaySuggestions) {
      setDisplaySuggestions(true);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!searchTerm) {
        return;
      }
      const newFocusOn =
        focusOn - 1 < 0 ? filteredList.length - 1 : focusOn - 1;
      setFocusOn(newFocusOn);
      setSearchTerm(filteredList[newFocusOn]);
      return;
    } else if (e.key === "ArrowDown") {
      if (!searchTerm) {
        return;
      }
      e.preventDefault();
      const newFocusOn = (focusOn + 1) % filteredList.length;
      setSearchTerm(filteredList[newFocusOn]);
      setFocusOn(newFocusOn);
      return;
    }
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    setFilteredList(
      newSearchTerm
        ? allAvailableKeywords
            .filter((word) => word.startsWith(newSearchTerm.toLowerCase()))
            .splice(0, 5)
        : []
    );
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

  return (
    <div className="search-form" ref={searchFormRef}>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleKeyPress}
          onKeyDown={handleKeyPress}
        />
      </form>
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
