import React, { useState } from "react";

import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { Spinner } from "react-bootstrap";

import { messages } from "../../config/constants";
import { TOAST_TYPES } from "../../utils/toast-util";
import { OFFER_STATUS } from "./offer-status-constants";
import * as api from "../../firebase/api/controllers/offers-controller";

import "./offer-modal.scss";

const OfferModal = (props) => {
  const { addToast } = useToasts();

  const [offer, setOffer] = useState({
    service: props.service.id,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isSavingData, setIsSavingData] = useState(false);

  const changeModalState = (modalState) => setIsModalOpen(modalState);

  const onFieldChange = (event) => {
    const { name, value } = event.target;
    if (name === "requestedDuration") {
      setOffer({
        ...offer,
        [name]: parseInt(value, 10),
        totalPrice: Math.round(value * props.service.price),
      });
    } else {
      setOffer({ ...offer, [name]: value });
    }
  };

  const onCreateOfferButtonClick = () => {
    setIsSavingData(true);

    const newOffer = {
      ...offer,
      fromUser: props.authenticationState.loggedUser.uid,
      toUser: props.service.uid,
      status: OFFER_STATUS.PENDING,
    };

    api
      .saveOffer(newOffer)
      .then(() => {
        changeModalState(false);
        addToast(messages.OFFER_CREATING_SUCCESS, {
          appearance: TOAST_TYPES.SUCCESS,
        });
        setIsSavingData(false);
      })
      .catch(({ message }) => {
        setIsSavingData(false);
        addToast(message, { appearance: TOAST_TYPES.ERROR });
      });
  };

  return (
    <div>
      <button
        onClick={() => changeModalState(true)}
        type="button"
        className="button is-medium is-info is-outlined"
        data-toggle="modal"
        data-target="#modal"
        // hidden={props.isOfferButtonHidden}
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
                name="note"
                placeholder="Write some catchy note"
                max="5"
                min="0"
                onChange={onFieldChange}
              />
              <p className="help input-label">
                Note can increase chance of getting the service
              </p>
            </div>
            <div className="field">
              <input
                className="input is-large"
                type="number"
                name="requestedDuration"
                placeholder="How long you need service for ?"
                max="5"
                min="0"
                onChange={onFieldChange}
              />
              <p className="help input-label">
                Enter time in hours (price per hour: ${props.service.price})
              </p>
            </div>
            <div className="service-price has-text-centered">
              <div className="service-price-title">
                Uppon acceptance, {props.service.createdBy.fullname} will charge
                you:
              </div>
              <div className="service-price-value">
                <h1 className="title">
                  ${offer?.totalPrice || props.service.price}
                </h1>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button
              className="button is-success"
              onClick={onCreateOfferButtonClick}
              disabled={isSavingData}
            >
              {isSavingData ? (
                <Spinner as="span" animation="border" size="sm" />
              ) : (
                "Create offer"
              )}
            </button>
            <button onClick={() => changeModalState(false)} className="button">
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authenticationState: state.authenticationState,
});

export default connect(mapStateToProps)(OfferModal);
