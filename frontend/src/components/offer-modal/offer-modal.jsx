import React, { useState } from "react";

import "./offer-modal.scss";

const OfferModal = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const changeModalState = (modalState) => setIsModalOpen(modalState);

  return (
    <div>
      <button
        onClick={() => changeModalState(true)}
        type="button"
        className="button is-medium is-info is-outlined"
        data-toggle="modal"
        data-target="#modal"
        hidden={props.isOfferButtonHidden}
      >
        Make an offer
      </button>
      <div className={`modal ${isModalOpen && "is-active"}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Make an offer</p>
            <button
              onClick={() => changeModalState(false)}
              className="delete"
              aria-label="close"
            ></button>
          </header>
          <section className="modal-card-body">
            <div className="field">
              <input
                className="input is-large"
                type="text"
                placeholder="Write some catchy note"
                max="5"
                min="0"
              />
              <p className="help input-label">
                Note can increase chance of getting the service
              </p>
            </div>
            <div className="field">
              <input
                className="input is-large"
                type="number"
                placeholder="How long you need service for ?"
                max="5"
                min="0"
              />
              <p className="help input-label">Enter time in hours</p>
            </div>
            <div className="service-price has-text-centered">
              <div className="service-price-title">
                Uppon acceptance, John Doe :) will charge you:
              </div>
              <div className="service-price-value">
                <h1 className="title">${props.service.price}</h1>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success">Save changes</button>
            <button onClick={() => changeModalState(false)} className="button">
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default OfferModal;
