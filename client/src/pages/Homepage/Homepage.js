import React from "react";
import "./Homepage.scss";
import SearchForm from "./components/SearchForm/SearchForm";
import Keywords from "./components/Keywords/Keywords";

const Homepage = () => {
  return (
    <div className="homepage">
      <h1>
        Sammenlign hvilke IT-relaterte stikkord blir nevnt i Finn.no annonser
        over tid
      </h1>
      <SearchForm />
      <Keywords />
    </div>
  );
};

export default Homepage;
