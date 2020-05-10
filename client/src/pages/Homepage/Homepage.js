import React from "react";
import "./Homepage.scss";
import SearchForm from "./components/SearchForm/SearchForm";
import Keywords from "./components/Keywords/Keywords";
import KeywordChart from "./components/KeywordChart/KeywordChart";

const Homepage = () => {
  return (
    <div className="homepage">
      <h1>
        Sammenlign hvilke IT-relaterte stikkord blir nevnt i Finn.no annonser
        over tid
      </h1>
      <SearchForm />
      <Keywords />
      <KeywordChart />
    </div>
  );
};

export default Homepage;
