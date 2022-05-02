import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

import {
  CONNECTION_STATUS_OFFLINE,
  CONNECTION_STATUS_ONLINE,
} from "constants/connection-status-constants";
import {
  COLLABORATION_STATUS,
  mapStatusToId,
} from "constants/collaboration-status-constants";
import { setSelectedCollaboration } from "../../actions/collaboration-actions";

import "../../pages/collaborations/collaborations.scss";
import { onCollaboratorIsTypingStatusChange } from "../../firebase/api/controllers/users-controller";
import { onCollaborationMessagesChange } from "../../firebase/api/controllers/collaborations-controller";

const CollaborationItem = ({
  collaboration,
  collaborator,
  activeUsers,
  handleJoinButtonClick,
  isCollaborationItemSelected,
  setIsCollaboratorTyping,
  scrollToBottom,
  savingState,
}) => {
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((state) => state.authenticationState);

  const isJoinButtonShown = () => {
    return !collaboration.collaborators?.find(
      (collaborator) => collaborator.id === loggedUser.id
    ).joined;
  };

  const isJoinButtonDisabled = () => {
    return savingState?.isSaving || false;
  };

  const hasAnyUnreadMessage = () => {
    return collaboration.messages.some((message) => !message.isRead);
  };

  const handleCollaborationItemClick = () => {
    dispatch(setSelectedCollaboration(collaboration));
    subscribeToTypingStatusChanges(collaboration);
    subscribeToCollaborationMessagesChanges(collaboration);
  };

  const subscribeToTypingStatusChanges = (collaboration) => {
    onCollaboratorIsTypingStatusChange(
      collaboration.id,
      collaborator.id,
      (isTyping) => {
        setIsCollaboratorTyping(isTyping);
        scrollToBottom();
      }
    );
  };

  const subscribeToCollaborationMessagesChanges = (collaboration) => {
    onCollaborationMessagesChange(collaboration.id, (messages) => {
      if (messages) {
        dispatch(
          setSelectedCollaboration({
            ...collaboration,
            messages: [...collaboration?.messages, ...messages],
          })
        );
        scrollToBottom();
      }
    });
  };

  const isUserOnline = () => {
    return activeUsers.includes(collaborator.id);
  };

  return (
    <div
      className={`view-wrap-item collaboration ${
        isCollaborationItemSelected && "collaboration-item-selected"
      }`}
      onClick={() => handleCollaborationItemClick()}
    >
      <img
        className="view-avatar-item"
        src={collaborator.avatar}
        alt="icon avatar"
      />
      <div className="view-wrap-content-item d-flex align-items-center">
        <span
          className={`text-item text-left ${
            hasAnyUnreadMessage() && "font-weight-bold"
          }`}
        >
          {collaborator.fullname}
        </span>
        {mapStatusToId(collaboration.status) === COLLABORATION_STATUS.JOINED ? (
          <div
            className={`badge status-badge mt-1 w-75 ${
              isUserOnline() ? "status-badge-online" : "status-badge-offline"
            }`}
          >
            {isUserOnline()
              ? CONNECTION_STATUS_ONLINE
              : CONNECTION_STATUS_OFFLINE}
          </div>
        ) : isJoinButtonShown() ? (
          <button
            onClick={handleJoinButtonClick}
            type="button"
            className="btn btn-success w-75 mt-1"
            disabled={isJoinButtonDisabled()}
            style={{ height: 32, padding: 2 }}
          >
            {savingState.isSaving &&
            savingState.collaboration?.id === collaboration?.id ? (
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
