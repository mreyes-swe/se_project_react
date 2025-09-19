import "./WeatherCard.css";
import sunny from "../../assets/sunny_weather_card.png";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F}&deg; F</p>
      <img className="weather-card__image" src={sunny} alt="Sunny Weather" />
    </section>
  );
}

export default WeatherCard;
