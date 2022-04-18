/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { useState } from "react";

import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { format } from "timeago.js";
import { Spinner } from "react-bootstrap";

import FAB from "components/fab/fab";
import { OFFER_STATUS, mapIdToStatus } from "constants/offer-status-constants";

import { TOAST_TYPES } from "utils/toast-util";
import { messages } from "config/constants";

import { acceptOffer, rejectOffer } from "../../actions/offer-actions";
import { createNewCollaboration } from "../../actions/collaboration-actions";
import {
  saveNotification,
  createOfferAcceptedNotification,
  createCollaborationInvitatioNotification,
} from "../../actions/notification-actions";

import "./offer-card.scss";

const ACTIONS = {
  OFFER_REJECTING: 0,
  OFFER_ACCEPTING: 1,
  COLLABORATION_REQUEST_CREATING: 2,
};

const OfferCard = ({ data, showControlButtons = false }) => {
  const { addToast } = useToasts();

  const { loggedUser } = useSelector((state) => state.authenticationState);

  const [offer, setOffer] = useState(data);
  const [savingState, setSavingState] = useState({
    isSaving: false,
  });

  const isOfferCreatedByLoggedUser = () => {
    return offer.fromUser.uid === loggedUser.uid;
  };

  const onAcceptButtonClick = () => {
    setSavingState({ action: ACTIONS.OFFER_ACCEPTING, isSaving: true });
    const updatedOffer = { ...offer, status: OFFER_STATUS.ACCEPTED };

    acceptOffer(updatedOffer)
      .then(() => {
        setSavingState({ action: ACTIONS.OFFER_ACCEPTING, isSaving: false });
        addToast(messages.OFFER_ACCEPTING_SUCCESS, {
          appearance: TOAST_TYPES.SUCCESS,
        });

        saveNotification(createOfferAcceptedNotification(updatedOffer));
        setOffer(updatedOffer);
      })
      .catch(({ message }) => {
        setSavingState({ action: ACTIONS.OFFER_ACCEPTING, isSaving: false });
        addToast(message, { appearance: TOAST_TYPES.ERROR });
      });
  };

  const onRejectButtonClick = () => {
    setSavingState({ action: ACTIONS.OFFER_REJECTING, isSaving: true });
    const updatedOffer = { ...offer, status: OFFER_STATUS.REJECTED };

    rejectOffer(updatedOffer)
      .then(() => {
        setSavingState({ action: ACTIONS.OFFER_REJECTING, isSaving: false });
        addToast(messages.OFFER_REJECTING_SUCCESS, {
          appearance: TOAST_TYPES.SUCCESS,
        });
        setOffer(updatedOffer);
      })
      .catch(({ message }) => {
        setSavingState({ action: ACTIONS.OFFER_REJECTING, isSaving: false });
        addToast(message, { appearance: TOAST_TYPES.ERROR });
      });
  };

  const onCreateCollaborationRequestButtonClick = () => {
    setSavingState({
      action: ACTIONS.COLLABORATION_REQUEST_CREATING,
      isSaving: true,
    });
    const updatedOffer = {
      ...offer,
      status: OFFER_STATUS.IN_COLLABORATION,
    };

    createNewCollaboration(updatedOffer)
      .then((collaborationId) => {
        addToast(messages.COLLABORATION_REQUEST_CREATING_SUCCESS, {
          appearance: TOAST_TYPES.SUCCESS,
        });

        updatedOffer.collaborationId = collaborationId;

        saveNotification(createCollaborationInvitatioNotification(updatedOffer))
          .then(() => {
            addToast(
              messages.COLLABORATION_INVITATION_NOTIFICATION_CREATING_SUCCESS,
              {
                appearance: TOAST_TYPES.SUCCESS,
              }
            );

            setSavingState({
              action: ACTIONS.COLLABORATION_REQUEST_CREATING,
              isSaving: false,
            });
          })
          .catch(({ message }) => {
            setSavingState({
              action: ACTIONS.COLLABORATION_REQUEST_CREATING,
              isSaving: false,
            });
            addToast(message, { appearance: TOAST_TYPES.ERROR });
          });

        setOffer(updatedOffer);
      })
      .catch(({ message }) => {
        setSavingState({
          action: ACTIONS.COLLABORATION_REQUEST_CREATING,
          isSaving: false,
        });
        addToast(message, { appearance: TOAST_TYPES.ERROR });
      });
  };

  const convertToMiliseconds = (createdAt) => {
    return createdAt * 1000;
  };

  return (
    <li>
      <a href="" className="offer-card">
        <img
          src="https://i.imgur.com/oYiTqum.jpg"
          className="offer-card__image"
          alt="offer-card-background-img"
        />
        <div className="offer-card__overlay">
          <div className="offer-card__header">
            <svg className="offer-card__arc" xmlns="http://www.w3.org/2000/svg">
              <path />
            </svg>
            <img
              className="offer-card__thumb"
              src={offer.fromUser.avatar}
              alt="avatar"
            />
            <div className="offer-card__header-text">
              <h3 className="offer-card__title">{offer.fromUser.fullname}</h3>
              <span className="offer-card__status">
                {format(
                  new Date(convertToMiliseconds(offer?.createdAt.seconds))
                )}
              </span>
              <span className="badge status-badge d-block">
                {mapIdToStatus(offer.status)}
              </span>
            </div>
          </div>
          <p className="offer-card__description">
            <b>{offer.note}</b>
            <br />
            I'd like to join this learning journey for {
              offer.requestedDuration
            }{" "}
            hours.
          </p>
          <FAB />
        </div>
      </a>
    </li>
  );
};

export default OfferCard;
