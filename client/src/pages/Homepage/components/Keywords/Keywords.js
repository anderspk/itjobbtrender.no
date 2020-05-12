import React from "react";
import { useGlobalState } from "../../../../providers/GlobalProvider";
import "./Keywords.scss";

const Keywords = () => {
  const { activeKeywords, handleRemoveKeyword } = useGlobalState();

  return (
    <ul className="keywords">
      <li className="totalt">Anonser Totalt</li>
      {activeKeywords.map((keyword) => (
        <li
          key={keyword}
          className="keyword"
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
