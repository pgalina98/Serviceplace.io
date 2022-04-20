import React, { useState } from "react";

import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { Spinner } from "react-bootstrap";

import { messages } from "../../config/constants";
import { TOAST_TYPES } from "../../utils/toast-util";
import { OFFER_STATUS } from "constants/offer-status-constants";

import { saveOffer } from "actions/offer-actions";
import {
  createNewOfferReceivedNotification,
  saveNotification,
} from "actions/notification-actions";

import "./offer-modal.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const OfferModal = (props) => {
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

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

  const handleCreateOfferButtonClick = () => {
    setIsSavingData(true);

    const newOffer = {
      ...offer,
      fromUser: props.authenticationState.loggedUser.id,
      toUser: props.service.createdBy.id,
      status: OFFER_STATUS.PENDING,
    };

    saveOffer(newOffer)
      .then(() => {
        changeModalState(false);
        addToast(messages.OFFER_CREATING_SUCCESS, {
          appearance: TOAST_TYPES.SUCCESS,
        });
        saveNotification(
          createNewOfferReceivedNotification({
            ...newOffer,
            fromUser: props.authenticationState.loggedUser,
            toUser: props.service.createdBy,
            service: props.service,
          })
        );
        setIsSavingData(false);
        navigate("/");
      })
      .catch(({ message }) => {
        setIsSavingData(false);
        addToast(message, { appearance: TOAST_TYPES.ERROR });
      });

    setOffer({ service: offer.service.id });
  };

  return (
    <div className="d-flex ml-70">
      <button
        onClick={() => changeModalState(true)}
        type="button"
        className="button is-medium is-info mt-60"
        data-toggle="modal"
        data-target="#modal"
        hidden={props.isOfferButtonHidden}
      >
        Make an offer
      </button>
      <form onSubmit={handleSubmit(handleCreateOfferButtonClick)}>
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
                  {...register("note", {
                    required: true,
                  })}
                  value={offer.note ?? ""}
                  onChange={onFieldChange}
                  className="input is-large"
                  type="text"
                  name="note"
                  placeholder="Write some catchy note"
                />
                {errors.note ? (
                  <div className="form-error input-label">
                    <span className="help is-danger">Note is required</span>
                  </div>
                ) : (
                  <p className="help input-label">
                    Note can increase chance of getting the service
                  </p>
                )}
              </div>
              <div className="field">
                <input
                  {...register("requestedDuration", {
                    required: true,
                  })}
                  value={offer.requestedDuration ?? ""}
                  onChange={onFieldChange}
                  className="input is-large"
                  type="number"
                  name="requestedDuration"
                  placeholder="How long you need service for ?"
                />
                {errors.requestedDuration ? (
                  <div className="form-error input-label">
                    <span className="help is-danger">Duration is required</span>
                  </div>
                ) : (
                  <p className="help input-label">
                    Enter time in hours (price per hour: ${props.service.price})
                  </p>
                )}
              </div>
              <div className="service-price has-text-centered">
                <div className="service-price-title">
                  Uppon acceptance, {props.service.createdBy.fullname} will
                  charge you:
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
                type="submit"
                className="button is-success"
                disabled={isSavingData}
              >
                {isSavingData ? (
                  <Spinner as="span" animation="border" size="sm" />
                ) : (
                  "Create offer"
                )}
              </button>
              <button
                onClick={() => {
                  reset();
                  changeModalState(false);
                }}
                className="button"
              >
                Cancel
              </button>
            </footer>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authenticationState: state.authenticationState,
});

export default connect(mapStateToProps)(OfferModal);
