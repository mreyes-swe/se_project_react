import { useEffect } from "react";
import "./ItemModal.css";

function ItemModal({ isOpen, onClose, selectedCard, onRemoveItem }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen, onClose]);

  const handleOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  const handleDelete = () => {
    onRemoveItem(selectedCard._id);
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_is-opened" : ""}`}
      onMouseDown={handleOverlayClose}
    >
      <div className="modal__content modal__content_type_image">
        <button
          className="modal__close-btn modal__close-btn_type_image"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="modal__image"
          src={selectedCard.imageUrl}
          alt={selectedCard.name}
        />
        <div className="modal__footer">
          <h2 className="modal__name">{selectedCard.name}</h2>
          <p className="modal__weather">Weather: {selectedCard.weather}</p>
          <button className="modal__delete-btn" onClick={handleDelete}>
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
