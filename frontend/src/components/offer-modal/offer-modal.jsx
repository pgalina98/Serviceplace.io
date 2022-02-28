import React, { useState } from "react";

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
          <section className="modal-card-body"></section>
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
