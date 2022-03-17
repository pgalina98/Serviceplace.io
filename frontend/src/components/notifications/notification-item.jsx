import React, { useEffect, useState } from "react";

import { format } from "timeago.js";
import { useToasts } from "react-toast-notifications";
import { Spinner } from "react-bootstrap";

import { TOAST_TYPES } from "utils/toast-util";
import { formatDate } from "utils/date-time-util";
import { APP_DATE_WITH_DAY_AND_MONTH_TIME_FORMAT } from "config/date-time.-formats";
import { acceptCollaborationInvitation } from "actions/messages-actions";
import { messages } from "config/constants";

import * as api from "../../firebase/api/controllers/users-controller";

const NotificationItem = ({ notification }) => {
  const { addToast } = useToasts();

  const [notificationState, setNotificationState] = useState();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    api.getUserByRef(notification.fromUserRef).then((response) => {
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
      })
      .catch(({ message }) => {
        setIsSaving(false);
        addToast(message, { appearance: TOAST_TYPES.ERROR });
      });
  };

  return (
    <div className="sec new">
      <div className="d-flex align-items-center">
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
            {isResolved() &&
              format(new Date(notificationState?.createdAt.seconds * 1000))}
            {" | "}
            {isResolved() &&
              formatDate(
                notificationState?.createdAt.seconds,
                APP_DATE_WITH_DAY_AND_MONTH_TIME_FORMAT
              )}
          </div>
        </div>
        <button
          onClick={() => onJoinButtonClick()}
          type="button"
          className="btn btn-success ml-3 col-2"
          disabled={isSaving}
          hidden={notificationState.invitationAccepted ?? false}
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
