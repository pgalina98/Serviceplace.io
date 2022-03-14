import React from "react";

import NotificationItem from "./notification-item";

const Notifications = ({ notifications }) => {
  return (
    <div className="box">
      <div className="display">
        {notifications?.length === 0 ? (
          <div className="nothing">
            <i className="stick"></i>
            <div className="cent">No notifications yet!</div>
          </div>
        ) : (
          <div className="cont">
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
