import React from "react";

import { formatDate } from "utils/date-time-util";
import { APP_DATE_WITH_DAY_AND_MONTH_TIME_FORMAT } from "config/date-time-formats";

import "../../pages/collaborations/collaborations.scss";

const Message = ({ side, data }) => {
  return (
    <div className={`view-wrap-item-${side} mb-2`}>
      <div className={`view-wrap-item-${side}-wrapper`}>
        <img
          src={data.fromUser.avatar}
          alt="avatar"
          className={`peer-avatar-${side}`}
        />
        <div className={`view-item-${side}`}>
          <span className="text-content-item">{data.text}</span>
        </div>
      </div>
      <span className={`text-time-${side}`}>
        {formatDate(
          data?.createdAt.seconds
            ? data?.createdAt.seconds
            : data?.createdAt / 1000,
          APP_DATE_WITH_DAY_AND_MONTH_TIME_FORMAT
        )}
      </span>
    </div>
  );
};

export default Message;
