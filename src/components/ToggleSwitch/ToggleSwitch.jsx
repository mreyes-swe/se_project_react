import { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );
  return (
    <>
      <input
        type="checkbox"
        id="temp-unit-input"
        className="toggle-switch__checkbox"
        onChange={handleToggleSwitchChange}
      />
      <label htmlFor="temp-unit-input" className="toggle-switch">
        <span className="toggle-switch__thumb"></span>
        <span
          className={`toggle-switch__track-content toggle-switch__track-content_left ${
            currentTemperatureUnit === "F"
              ? "toggle-switch__track-content_active"
              : ""
          }`}
        >
          F
        </span>
        <span
          className={`toggle-switch__track-content toggle-switch__track-content_right ${
            currentTemperatureUnit === "C"
              ? "toggle-switch__track-content_active"
              : ""
          }`}
        >
          C
        </span>
      </label>
    </>
  );
}

export default ToggleSwitch;
