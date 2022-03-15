import React from "react";

import { format } from "timeago.js";

import { formatDate } from "utils/date-time-util";
import { APP_DATE_WITH_DAY_AND_MONTH_TIME_FORMAT } from "config/date-time.-formats";

const NotificationItem = ({ notification }) => {
  return (
    <div className="sec new">
      <div className="d-flex align-items-center">
        <div className="d-flex flex-wrap justify-content-center border-right">
          <img
            className="profile-image"
            src={notification.fromUser.avatar}
            alt="profile-img"
          />
          <div className="txt sub">{notification.fromUser.fullname}</div>
        </div>
        <div>
          <div className="txt ml-3">{notification.text}</div>
          <div className="txt sub ml-3">
            {format(new Date(notification.createdAt.seconds * 1000))}
            {" | "}
            {formatDate(
              notification.createdAt.seconds,
              APP_DATE_WITH_DAY_AND_MONTH_TIME_FORMAT
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
