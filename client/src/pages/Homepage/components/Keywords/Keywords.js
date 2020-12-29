import React from "react";
import { useGlobalState } from "../../../../providers/GlobalProvider";
import "./Keywords.scss";
import { colors } from "../../../../utils/colorsUtil";

const Keywords = () => {
  const { activeKeywords, handleRemoveKeyword } = useGlobalState();

  return (
    <ul className="keywords">
      {activeKeywords.map((keyword, i) => (
        <li
          key={keyword}
          className="keyword"
          style={{ borderColor: colors[i] }}
          onClick={() => handleRemoveKeyword(keyword)}
        >
          {keyword}
          <i className="close" />
        </li>
      ))}
    </ul>
  );
};

export default Keywords;
