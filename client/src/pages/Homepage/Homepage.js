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
      <p className="info">
        Finner du ikke et nøkkelord, eller ønsker du å bidra med
        forbedringsforslag eller kode, sjekk ut repoen på{" "}
        <a href="https://github.com/anderspk/itjobbtrender">Github</a>
      </p>
      <p className="info">
        Ny data hentes automatisk hver dag fra nye IT-jobbannonser som legges ut
        på Finn.no
      </p>
    </div>
  );
};

export default Homepage;
