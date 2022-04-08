import React from "react";
import { mapIdToStatus } from "utils/connection-status-constants";

import "../../pages/collaborations/collaborations.scss";

const Collaboration = ({ collaborator }) => {
  console.log("collaborator: ", collaborator);

  return (
    <div className="view-wrap-item collaboration">
      <img
        className="view-avatar-item"
        src="https://i.imgur.com/cVDadwb.png"
        alt="icon avatar"
      />
      <div className="view-wrap-content-item">
        <span className="text-item">{collaborator.fullname}</span>
        <span className="text-item">
          {mapIdToStatus(collaborator.activityStatus)}
        </span>
      </div>
    </div>
  );
};

export default Collaboration;
