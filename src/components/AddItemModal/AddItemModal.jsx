import useForm from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ isOpen, onAddItem, onClose }) {
  const { values, handleChange } = useForm({
    name: "",
    imageUrl: "",
    weatherType: "",
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values, handleReset);
  }

  function handleReset() {
    values.name = "";
    values.imageUrl = "";
    values.weatherType = "";
  }

  return (
    <ModalWithForm
      name="add-garment-form"
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <label className="modal__label" htmlFor="name-input">
        Name
        <input
          className="modal__input"
          type="text"
          id="name-input"
          placeholder="Name"
          name="name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label" htmlFor="image-url-input">
        Image
        <input
          className="modal__input"
          type="url"
          id="image-url-input"
          placeholder="Image URL"
          name="imageUrl"
          value={values.imageUrl}
          onChange={handleChange}
          required
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
            name="weatherType"
            value="hot"
            checked={values.weatherType === "hot"}
            onChange={handleChange}
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
            name="weatherType"
            value="warm"
            checked={values.weatherType === "warm"}
            onChange={handleChange}
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
            name="weatherType"
            value="cold"
            checked={values.weatherType === "cold"}
            onChange={handleChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
