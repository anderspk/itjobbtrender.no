import React from "react";
import Header from "./components/Header/Header";
import "./App.scss";
import Homepage from "./pages/Homepage/Homepage";
import GlobalProvider from "./providers/GlobalProvider";
const App = () => {
  return (
    <div className="app">
      <GlobalProvider>
        <Header />
        <Homepage />
      </GlobalProvider>
    </div>
  );
};

export default App;
