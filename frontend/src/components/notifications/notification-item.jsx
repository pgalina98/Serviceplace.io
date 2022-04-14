import React, { useEffect, useState } from "react";

import { format } from "timeago.js";
import { useToasts } from "react-toast-notifications";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { TOAST_TYPES } from "utils/toast-util";
import { formatDate } from "utils/date-time-util";
import { APP_DATE_WITH_DAY_AND_MONTH_TIME_FORMAT } from "config/date-time-formats";
import {
  removeNotification,
  acceptCollaborationInvitation,
} from "actions/notification-actions";
import { messages } from "config/constants";
import { NOTIFICATION_TYPES } from "constants/notification-type-constants";
import { updateCollaboratorStatus } from "actions/collaboration-actions";

import * as api from "../../firebase/api/controllers/users-controller";

const NotificationItem = ({ notification }) => {
  const navigate = useNavigate();
  const { addToast } = useToasts();

  const { loggedUser } = useSelector((state) => state.authenticationState);

  const [notificationState, setNotificationState] = useState();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    api.fetchUserByRef(notification.fromUserRef).then((response) => {
      delete Object.assign(notification, {
        fromUser: { id: response.id, ...response.data() },
      })["fromUserRef"];
      setNotificationState(notification);
    });
  }, [notification]);

  const isResolved = () => {
    return notificationState ?? false;
  };

  const onJoinButtonClick = () => {
    setIsSaving(true);
    const updatedNotification = {
      ...notificationState,
      invitationAccepted: true,
    };

    acceptCollaborationInvitation(updatedNotification)
      .then(() => {
        setIsSaving(false);
        addToast(messages.COLLABORATION_INVITATION_ACCEPTING_SUCCESS, {
          appearance: TOAST_TYPES.SUCCESS,
        });
        setNotificationState(updatedNotification);
        updateCollaboratorStatus(
          updatedNotification.collaborationRef.id,
          loggedUser.id,
          true
        );
        navigate(`/collaborations/${updatedNotification.collaborationRef.id}`);
      })
      .catch(({ message }) => {
        setIsSaving(false);
        addToast(message, { appearance: TOAST_TYPES.ERROR });
      });
  };

  const onRemoveNotificationButtonClick = (notification) => {
    removeNotification(notification);
  };

  return (
    <div className="sec new position-relative">
      <div className="d-flex align-items-center">
        <i
          className="bi bi-x position-absolute top-0 remove-notification-icon"
          onClick={() => onRemoveNotificationButtonClick(notificationState)}
        />
        <div className="d-flex flex-wrap justify-content-center border-right col-3">
          <img
            className="profile-image"
            src={isResolved() ? notificationState?.fromUser.avatar : undefined}
            alt="profile-img"
          />
          <div className="txt sub mt-2 text-center">
            {isResolved() && notificationState?.fromUser.fullname}
          </div>
        </div>
        <div className="col-6">
          <div className="txt ml-3">
            {isResolved() && notificationState?.text}
          </div>
          <div className="txt sub ml-3">
            {isResolved() && format(new Date(notificationState?.createdAt))}
            {" | "}
            {isResolved() && notificationState?.createdAt}
          </div>
        </div>
        <button
          onClick={() => onJoinButtonClick()}
          type="button"
          className="btn btn-success ml-3 col-2"
          disabled={isSaving}
          hidden={
            (notificationState?.invitationAccepted ?? false) ||
            notificationState?.type !==
              NOTIFICATION_TYPES.COLLABORATION_INVITATION
          }
        >
          {isSaving ? (
            <Spinner as="span" animation="border" size="sm" />
          ) : (
            "Join"
          )}
        </button>
      </div>
    </div>
  );
};

export default NotificationItem;
