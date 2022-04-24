import React, { useEffect, useState } from "react";

import { format } from "timeago.js";

import { removeNotification } from "actions/notification-actions";

import * as api from "../../firebase/api/controllers/users-controller";
import { formatDate } from "utils/date-time-util";
import { APP_DATE_WITH_DAY_AND_MONTH_TIME_FORMAT } from "config/date-time-formats";

const NotificationItem = ({ notification }) => {
  const [notificationState, setNotificationState] = useState();

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

  const handleRemoveNotificationButtonClick = (notification) => {
    removeNotification(notification);
  };

  const convertToMiliseconds = (createdAt) => {
    return createdAt * 1000;
  };

  return (
    <div className="sec new position-relative">
      <div className="d-flex align-items-center">
        <i
          className="bi bi-x position-absolute top-0 remove-notification-icon"
          onClick={() => handleRemoveNotificationButtonClick(notificationState)}
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
            {isResolved() &&
              format(
                new Date(
                  convertToMiliseconds(
                    notificationState?.createdAt?.seconds || new Date().now()
                  )
                )
              )}
            {" | "}
            {isResolved() &&
              formatDate(
                notificationState?.createdAt.seconds,
                APP_DATE_WITH_DAY_AND_MONTH_TIME_FORMAT
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
