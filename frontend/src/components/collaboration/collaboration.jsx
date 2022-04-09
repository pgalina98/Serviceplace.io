import React from "react";

import {
  CONNECTION_STATUS,
  mapIdToStatus,
} from "constants/connection-status-constants";

import "../../pages/collaborations/collaborations.scss";

const Collaboration = ({ collaborator }) => {
  return (
    <div className="view-wrap-item collaboration">
      <img
        className="view-avatar-item"
        src="https://i.imgur.com/cVDadwb.png"
        alt="icon avatar"
      />
      <div className="view-wrap-content-item">
        <span className="text-item">{collaborator.fullname}</span>
        <div
          className={`badge status-badge ${
            collaborator.activityStatus === CONNECTION_STATUS.ONLINE
              ? "status-badge-online"
              : "status-badge-offline"
          }`}
        >
          {mapIdToStatus(collaborator.activityStatus)}
        </div>
      </div>
    </div>
  );
};

export default Collaboration;
