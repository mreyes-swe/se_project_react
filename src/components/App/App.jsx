import { useState, useEffect } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { defaultClothingItems } from "../../utils/clothingItems";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather } from "../../utils/weatherApi";
import { coordinates, apiKey } from "../../utils/constants";
import { filterWeatherData } from "../../utils/weatherApi";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleOpenAddClothesModal = () => {
    setActiveModal("add-garment");
  };

  const handleOpenItemModal = (card) => {
    setActiveModal("garment-info");
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredWeatherData = filterWeatherData(data);

        setWeatherData(filteredWeatherData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="app">
      <div className="app__content">
        <Header
          onAddClothesClick={handleOpenAddClothesModal}
          weatherData={weatherData}
        />
        <Main
          weatherData={weatherData}
          clothingItems={clothingItems}
          onGarmentClick={handleOpenItemModal}
        />
        <Footer />
      </div>
      <ModalWithForm
        title={"New garment"}
        buttonText={"Add garment"}
        isOpen={activeModal === "add-garment"}
        onClose={handleCloseModal}
        name={"add-garment-form"}
      >
        <label className="modal__label" htmlFor="name-input">
          Name
          <input
            className="modal__input"
            type="text"
            id="name-input"
            placeholder="Name"
          />
        </label>
        <label className="modal__label" htmlFor="imageURL-input">
          Image
          <input
            className="modal__input"
            type="url"
            id="imageURL-input"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label
            htmlFor="hot-btn"
            className="modal__label modal__label_type_radio"
          >
            <input
              className="modal__radio-input"
              type="radio"
              id="hot-btn"
              name="weather-type"
              value="hot"
            />
            Hot
          </label>
          <label
            htmlFor="warm-btn"
            className="modal__label modal__label_type_radio"
          >
            <input
              className="modal__radio-input"
              type="radio"
              id="warm-btn"
              name="weather-type"
              value="warm"
            />
            Warm
          </label>
          <label
            htmlFor="cold-btn"
            className="modal__label modal__label_type_radio"
          >
            <input
              className="modal__radio-input"
              type="radio"
              id="cold-btn"
              name="weather-type"
              value="cold"
            />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        isOpen={activeModal === "garment-info"}
        onClose={handleCloseModal}
        selectedCard={selectedCard}
      />
    </div>
  );
}

export default App;
