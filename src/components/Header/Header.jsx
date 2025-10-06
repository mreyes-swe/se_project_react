import { NavLink } from "react-router-dom";

import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ onAddClothesClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <NavLink to="/">
        <img className="header__logo" src={logo} alt="WTWR Logo" />
      </NavLink>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      <button
        type="button"
        className="header__add-clothes-btn"
        onClick={onAddClothesClick}
      >
        + Add clothes
      </button>
      <NavLink to="/profile" className="header__nav-link">
        <div className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img
            className="header__avatar"
            src={avatar}
            alt="Terrence Tegegne's Avatar"
          />
        </div>
      </NavLink>
    </header>
  );
}

export default Header;
