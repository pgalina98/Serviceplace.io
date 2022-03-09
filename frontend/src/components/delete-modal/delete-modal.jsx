import React from "react";

import { Spinner } from "react-bootstrap";

const DeleteModal = ({
  isModalOpen,
  onDeleteButtonClick,
  closeModal,
  isSavingData,
}) => {
  return (
    <div className={`modal ${isModalOpen && "is-active"}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            Are you sure you want to delete this service?
          </p>
          <button
            onClick={closeModal}
            className="delete"
            aria-label="close"
          ></button>
        </header>
        <section className="modal-card-body">
          <span style={{ float: "left" }}>
            Service will be permanently deleted!
          </span>
        </section>
        <footer className="modal-card-foot">
          <button
            className="button is-success"
            onClick={onDeleteButtonClick}
            disabled={isSavingData}
          >
            {isSavingData ? (
              <Spinner as="span" animation="border" size="sm" />
            ) : (
              "Delete service"
            )}
          </button>
          <button onClick={closeModal} className="button">
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default DeleteModal;
