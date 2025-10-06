import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, apiKey } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import {
  getClothingItems,
  addClothingItem,
  removeClothingItem,
} from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

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

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const onAddItem = (inputValues, handleReset) => {
    if (
      !inputValues.name ||
      !inputValues.imageUrl ||
      !inputValues.weatherType
    ) {
      console.error("All fields are required");
      return;
    }

    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weatherType,
    };

    addClothingItem(newCardData)
      .then((data) => {
        setClothingItems((prev) => [data, ...prev]);
        handleReset();
        handleCloseModal();
      })
      .catch(console.error);
  };

  const onRemoveItem = (itemId) => {
    removeClothingItem(itemId)
      .then(() => {
        const updatedClothingItems = clothingItems.filter((item) => {
          return item._id !== itemId;
        });
        setClothingItems(updatedClothingItems);
        handleCloseModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredWeatherData = filterWeatherData(data);
        setWeatherData(filteredWeatherData);
      })
      .catch(console.error);

    getClothingItems()
      .then((data) => {
        setClothingItems([...data].reverse());
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="app">
        <div className="app__content">
          <Header
            onAddClothesClick={handleOpenAddClothesModal}
            weatherData={weatherData}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  onGarmentClick={handleOpenItemModal}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  onGarmentClick={handleOpenItemModal}
                  onAddNewClick={handleOpenAddClothesModal}
                />
              }
            />
          </Routes>

          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onAddItem={onAddItem}
          onClose={handleCloseModal}
        />
        <ItemModal
          isOpen={activeModal === "garment-info"}
          onClose={handleCloseModal}
          selectedCard={selectedCard}
          onRemoveItem={onRemoveItem}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
