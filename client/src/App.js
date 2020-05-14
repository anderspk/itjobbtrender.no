import React from "react";
import Header from "./components/Header/Header";
import "./App.scss";
import Homepage from "./pages/Homepage/Homepage";
import GlobalProvider from "./providers/GlobalProvider";
import Footer from "./components/Footer/Footer";
const App = () => {
  return (
    <div className="app">
      <Header />
      <GlobalProvider>
        <Homepage />
      </GlobalProvider>
      <Footer />
    </div>
  );
};

export default App;
