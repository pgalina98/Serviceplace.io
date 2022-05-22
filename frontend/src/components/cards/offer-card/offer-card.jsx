/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { useState } from "react";

import { format } from "timeago.js";
import { useToasts } from "react-toast-notifications";

import FAB from "components/buttons/fab/fab";
import { OFFER_STATUS, mapIdToStatus } from "constants/offer-status-constants";

import { TOAST_TYPES } from "utils/toast-util";
import { messages } from "config/constants";

import { acceptOffer, rejectOffer } from "../../../actions/offer-actions";
import { createNewCollaboration } from "../../../actions/collaboration-actions";
import {
  saveNotification,
  createOfferAcceptedNotification,
} from "../../../actions/notification-actions";

import "./offer-card.scoped.scss";

export const ACTIONS = {
  OFFER_REJECTING: 0,
  OFFER_ACCEPTING: 1,
  COLLABORATION_REQUEST_CREATING: 2,
};

const OfferCard = ({ data, showControlButtons = false }) => {
  const { addToast } = useToasts();

  const [offer, setOffer] = useState(data);
  const [savingState, setSavingState] = useState({
    action: null,
    isSaving: false,
  });

  const handleAcceptButtonClick = () => {
    setSavingState({ action: ACTIONS.OFFER_ACCEPTING, isSaving: true });
    const updatedOffer = { ...offer, status: OFFER_STATUS.ACCEPTED };

    acceptOffer(updatedOffer)
      .then(() => {
        setSavingState({ action: ACTIONS.OFFER_ACCEPTING, isSaving: false });
        addToast(messages.OFFER_ACCEPTING_SUCCESS, {
          appearance: TOAST_TYPES.SUCCESS,
        });

        saveNotification(createOfferAcceptedNotification(updatedOffer));

        createNewCollaboration(updatedOffer)
          .then(() => {
            addToast(messages.COLLABORATION_REQUEST_CREATING_SUCCESS, {
              appearance: TOAST_TYPES.SUCCESS,
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
        setOffer(updatedOffer);
      })
      .catch(({ message }) => {
        setSavingState({ action: ACTIONS.OFFER_ACCEPTING, isSaving: false });
        addToast(message, { appearance: TOAST_TYPES.ERROR });
      });
  };

  const handleRejectButtonClick = () => {
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

  const convertToMiliseconds = (createdAt) => {
    return createdAt * 1000;
  };

  return (
    <li>
      <a href="" className="offer-card">
        <img
          src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/63915d104315617.5f6084db8b877.jpg"
          className="offer-card_image"
          alt="offer-card-background-img"
        />
        <div
          className="offer-card_overlay"
          onClick={(event) => event.preventDefault()}
        >
          <div className="offer-card_header">
            <img
              className="offer-card_thumb"
              src={offer.fromUser.avatar}
              alt="avatar"
            />
            <div className="offer-card_header-text">
              <h3 className="offer-card_title">{offer.fromUser.fullname}</h3>
              <span className="offer-card_status">
                {format(
                  new Date(convertToMiliseconds(offer?.createdAt.seconds))
                )}
              </span>
              <span className="badge status-badge d-block">
                {mapIdToStatus(offer.status)}
              </span>
            </div>
          </div>
          <p className="offer-card_description">
            <b>{offer.note}</b>
            <br />
            I'd like to join this learning journey for {
              offer.requestedDuration
            }{" "}
            hours.
          </p>
          {showControlButtons && offer.status === OFFER_STATUS.PENDING && (
            <FAB
              savingState={savingState}
              handleAcceptButtonClick={handleAcceptButtonClick}
              handleRejectButtonClick={handleRejectButtonClick}
            />
          )}
        </div>
      </a>
    </li>
  );
};

export default OfferCard;
