import { useContext } from "react";
import "./WeatherCard.css";
import sunny from "../../assets/sunny_weather_card.png";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]}&deg;{currentTemperatureUnit}
      </p>
      <img className="weather-card__image" src={sunny} alt="Sunny Weather" />
    </section>
  );
}

export default WeatherCard;
