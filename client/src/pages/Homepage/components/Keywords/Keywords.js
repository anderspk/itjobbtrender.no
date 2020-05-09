import React from "react";
import { useGlobalState } from "../../../../providers/GlobalProvider";
import "./Keywords.scss";

const Keywords = () => {
  const { keywords, handleRemoveKeyword } = useGlobalState();

  return (
    <div className="keywords">
      {keywords.map((keyword) => (
        <span
          key={keyword}
          className="keyword"
          onClick={() => handleRemoveKeyword(keyword)}
        >
          {keyword}
        </span>
      ))}
    </div>
  );
};

export default Keywords;
