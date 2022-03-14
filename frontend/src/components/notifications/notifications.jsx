import React from "react";

import NotificationItem from "./notification-item";

const Notifications = ({ notifications }) => {
  return (
    <div className="notification-box">
      <div className="display">
        {notifications?.length === 0 ? (
          <div className="nothing">
            <i className="stick"></i>
            <div className="cent">No notifications yet!</div>
          </div>
        ) : (
          notifications?.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
