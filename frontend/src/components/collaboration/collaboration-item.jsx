import React from "react";

import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

import {
  CONNECTION_STATUS,
  mapIdToStatus,
} from "constants/connection-status-constants";
import {
  COLLABORATION_STATUS,
  mapStatusToId,
} from "constants/collaboration-status-constants";

import "../../pages/collaborations/collaborations.scss";

const CollaborationItem = ({
  collaboration,
  collaborator,
  onJoinButtonClick,
  onCollaborationItemClick,
  isCollaborationItemSelected,
  isSaving,
}) => {
  const { loggedUser } = useSelector((state) => state.authenticationState);

  const isJoinButtonShown = () => {
    return !collaboration.collaborators.find(
      (collaborator) => collaborator.id === loggedUser.id
    ).joined;
  };

  return (
    <div
      className={`view-wrap-item collaboration ${
        isCollaborationItemSelected && "collaboration-item-selected"
      }`}
      onClick={onCollaborationItemClick}
    >
      <img
        className="view-avatar-item"
        src={collaborator.avatar}
        alt="icon avatar"
      />
      <div className="view-wrap-content-item d-flex align-items-center">
        <span className="text-item text-left">{collaborator.fullname}</span>
        {mapStatusToId(collaboration.status) === COLLABORATION_STATUS.JOINED ? (
          <div
            className={`badge status-badge mt-1 w-75 ${
              collaborator.activityStatus === CONNECTION_STATUS.ONLINE
                ? "status-badge-online"
                : "status-badge-offline"
            }`}
          >
            {mapIdToStatus(collaborator.activityStatus)}
          </div>
        ) : isJoinButtonShown() ? (
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
