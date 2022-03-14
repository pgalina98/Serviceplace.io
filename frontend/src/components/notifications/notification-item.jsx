import React from "react";

import { format } from "timeago.js";

import { formatDate } from "utils/date-time-util";
import { APP_DATE_WITH_DAY_AND_MONTH_TIME_FORMAT } from "config/date-time.-formats";

const NotificationItem = ({ notification }) => {
  return (
    <div className="sec new">
      <div className="d-flex align-items-center">
        <img
          className="profile-image"
          src="https://obamawhitehouse.archives.gov/sites/obamawhitehouse.archives.gov/files/styles/person_medium_photo/public/person-photo/amanda_lucidon22.jpg?itok=JFPi8OFJ"
          alt="profile-img"
        />
        <div>
          <div className="txt">{notification.text}</div>
          <div className="txt sub">
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
