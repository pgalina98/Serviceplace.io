import React from "react";

import { format } from "timeago.js";

import "../../../pages/collaborations/collaborations.scoped.scss";

const Message = ({ side, data }) => {
  const convertToMiliseconds = (createdAt) => {
    return createdAt * 1000;
  };

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
        {format(
          new Date(
            data?.createdAt.seconds
              ? convertToMiliseconds(data?.createdAt.seconds)
              : data?.createdAt.milliseconds
          )
        )}
      </span>
    </div>
  );
};

export default Message;
