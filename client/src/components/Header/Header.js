import React from "react";
import logo from "../../images/line-chart.png";
import "./Header.scss";

const Header = () => {
  return (
    <header>
      <a href="/" className="logo">
        <img src={logo} alt="Logo" />
        <span>IT-Trender</span>
      </a>
    </header>
  );
};

export default Header;
