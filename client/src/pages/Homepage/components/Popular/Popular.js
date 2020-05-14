import React from "react";
import "./Popular.scss";
import { useGlobalState } from "../../../../providers/GlobalProvider";

const Popular = () => {
  const { activeKeywords, handlePopularChoicePick } = useGlobalState();

  return (
    <div className={`popular ${activeKeywords.length > 0 ? "hidden" : ""}`}>
      <h3>Populære</h3>
      <ul>
        <li
          onClick={() =>
            handlePopularChoicePick("python", "javascript", "java")
          }
        >
          Python <VS /> Javascript <VS /> Java
        </li>
        <li onClick={() => handlePopularChoicePick("react", "angular", "vue")}>
          React <VS /> Angular <VS /> Vue
        </li>
        <li
          onClick={() =>
            handlePopularChoicePick("azure", "aws", "google cloud platform")
          }
        >
          Azure <VS /> AWS <VS /> Google Cloud Platform
        </li>
      </ul>
    </div>
  );
};

const VS = () => <span className="vs">vs</span>;

export default Popular;
