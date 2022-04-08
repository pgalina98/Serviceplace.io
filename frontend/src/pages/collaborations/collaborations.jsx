import React, { useEffect, useRef, useState } from "react";

import { Alert } from "reactstrap";

import Spinner from "components/spinner/spinner";
import Collaboration from "components/collaboration/collaboration";
import Message from "components/message/message";

import { subscribe as subscribeToCollaborations } from "actions/collaboration-actions";
import { subscribe as subscribeToUsers } from "actions/user-actions";

import authenticatedBoundaryRoute from "router/authenticated-boundary-route/authenticated-boundary-route";

import "./collaborations.scss";

const Collaborations = ({ authenticationState }) => {
  const firstRenderRef = useRef(true);

  const [collaborations, setCollaborations] = useState();
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    subscribeToUsers((users) => {
      setUsers(users);
    });
  }, []);

  useEffect(() => {
    subscribeToCollaborations(
      authenticationState.loggedUser.id,
      (collaborations) => {
        setCollaborations(collaborations);
        setIsLoading(false);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticationState.loggedUser.id]);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    const updatedCollaborations = collaborations?.map((collaboration) => ({
      ...collaboration,
      collaborators: collaboration.collaborators?.map((collaborator) => ({
        ...collaborator,
        activityStatus: users.find((user) => user.id === collaborator.id)[
          "activityStatus"
        ],
      })),
    }));

    setCollaborations(updatedCollaborations);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  const getCollaborator = (collaboration) => {
    return collaboration.collaborators.find(
      (collaborator) => collaborator.id !== authenticationState.loggedUser.id
    );
  };

  const renderCollaborations = (collaborations) => {
    return collaborations.map((collaboration) => (
      <Collaboration
        key={collaboration.id}
        collaborator={getCollaborator(collaboration)}
      />
    ));
  };

  if (!isLoading && collaborations.length === 0) {
    return (
      <div className="container">
        <div className="content-wrapper">
          <Alert color="primary">You don't have any collaborations yet!</Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="root">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="body">
          <div className="view-list-user">
            {renderCollaborations(collaborations)}
          </div>
          <div className="view-board">
            <div className="view-chat-board">
              <div className="header-chat-board">
                <img
                  className="view-avatar-item"
                  src="https://i.imgur.com/cVDadwb.png"
                  alt="icon avatar"
                />
                <span className="text-header-chat-board">Filip Jerga</span>
              </div>
              <div className="view-list-content-chat">
                <Message side="left" />
                <Message side="right" />
                <div style={{ float: "left", clear: "both" }}></div>
              </div>
              <div className="view-bottom">
                <input
                  className="view-input"
                  placeholder="Type your message..."
                />
                <div className="send-icon">
                  <i className="bi bi-send icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default authenticatedBoundaryRoute(Collaborations);
