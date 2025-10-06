import { useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  name,
  title,
  buttonText,
  isOpen,
  onSubmit,
  onClose,
  children,
}) {
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

  return (
    <div
      className={`modal ${isOpen ? "modal_is-opened" : ""}`}
      onMouseDown={handleOverlayClose}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button type="button" className="modal__close-btn" onClick={onClose} />
        <form name={name} className="modal__form" onSubmit={onSubmit}>
          {children}
          <button type="submit" className="modal__submit-btn">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
