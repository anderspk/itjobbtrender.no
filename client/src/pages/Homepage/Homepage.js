import React from "react";
import "./Homepage.scss";
import SearchForm from "./components/SearchForm/SearchForm";
import Keywords from "./components/Keywords/Keywords";
import KeywordChart from "./components/KeywordChart/KeywordChart";
import TimeframePicker from "./components/TimeframePicker/TimeframePicker";

const Homepage = () => {
  return (
    <div className="homepage">
      <h1>
        Sammenlign hvilke IT-relaterte stikkord blir nevnt i Finn.no
        jobbannonser over tid
      </h1>
      <SearchForm />
      <Keywords />
      <TimeframePicker />
      <KeywordChart />
    </div>
  );
};

export default Homepage;
