import React, { useState, useRef, useCallback } from "react";
import "./AutoSuggest.scss";
import useClickOutside from "../../../../../hooks/useClickOutside";

const AutoSuggest = ({ list }) => {
  const [focusOn, setFocusOn] = useState("");
  const autoSuggestRef = useRef(null);

  const handleClickOutside = useCallback(() => {
    console.log("clicked outside!");
  });

  useClickOutside(autoSuggestRef, handleClickOutside);

  const handleHover = (word) => {
    setFocusOn(word);
  };

  return (
    <ul
      className={list.length > 0 ? "auto-suggest" : "hidden"}
      ref={autoSuggestRef}
    >
      {list.map((word) => (
        <li
          key={word}
          className={`suggestion ${word === focusOn ? "in-focus" : ""}`}
          onMouseEnter={() => handleHover(word)}
        >
          {word}
        </li>
      ))}
    </ul>
  );
};

export default AutoSuggest;
