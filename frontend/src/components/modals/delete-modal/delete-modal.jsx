import React from "react";

import { Spinner } from "react-bootstrap";

const DeleteModal = ({
  isModalOpen,
  handleDeleteButtonClick,
  handleCloseModal,
  isSavingData,
}) => {
  return (
    <div className={`modal ${isModalOpen && "is-active"}`}>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            Are you sure you want to delete this service?
          </p>
          <button
            onClick={handleCloseModal}
            className="delete"
            aria-label="close"
          />
        </header>
        <section className="modal-card-body">
          <span className="float-left">
            Service will be permanently deleted!
          </span>
        </section>
        <footer className="modal-card-foot">
          <button
            className="button is-success"
            onClick={handleDeleteButtonClick}
            disabled={isSavingData}
          >
            {isSavingData ? (
              <Spinner as="span" animation="border" size="sm" />
            ) : (
              "Delete service"
            )}
          </button>
          <button onClick={handleCloseModal} className="button">
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default DeleteModal;
