import React from "react";

import { Spinner } from "react-bootstrap";

import {
  CONNECTION_STATUS,
  mapIdToStatus,
} from "constants/connection-status-constants";

import "../../pages/collaborations/collaborations.scss";
import { useSelector } from "react-redux";

const CollaborationItem = ({
  collaborator,
  onCollaborationItemClick,
  onJoinButtonClick,
  isSaving,
}) => {
  const { loggedUser } = useSelector((state) => state.authenticationState);

  return (
    <div
      className="view-wrap-item collaboration"
      onClick={onCollaborationItemClick}
    >
      <img
        className="view-avatar-item"
        src="https://i.imgur.com/cVDadwb.png"
        alt="icon avatar"
      />
      <div className="view-wrap-content-item d-flex align-items-center">
        <span className="text-item">{collaborator.fullname}</span>
        {collaborator.joined ? (
          <div
            className={`badge status-badge mt-1 w-75 ${
              collaborator.activityStatus === CONNECTION_STATUS.ONLINE
                ? "status-badge-online"
                : "status-badge-offline"
            }`}
          >
            {mapIdToStatus(collaborator.activityStatus)}
          </div>
        ) : collaborator.id !== loggedUser.id ? (
          <button
            onClick={onJoinButtonClick}
            type="button"
            className="btn btn-success w-75 mt-1"
            disabled={isSaving}
          >
            {isSaving ? (
              <Spinner as="span" animation="border" size="sm" />
            ) : (
              "Join"
            )}
          </button>
        ) : (
          <div className="badge status-badge w-75">PENDING</div>
        )}
      </div>
    </div>
  );
};

export default CollaborationItem;
