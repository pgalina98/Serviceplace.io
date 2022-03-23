import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Alert } from "reactstrap";

import Spinner from "components/spinner/spinner";

import { getLoggedUserCollaborations } from "actions/collaboration-actions";

import authenticatedBoundaryRoute from "router/authenticated-boundary-route/authenticated-boundary-route";

import "./collaborations.scss";

const Collaborations = ({ authenticationState }) => {
  const [collaborations, setCollaborations] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLoggedUserCollaborations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticationState.loggedUser.id]);

  const fetchLoggedUserCollaborations = () => {
    setIsLoading(true);

    getLoggedUserCollaborations(authenticationState.loggedUser.id).then(
      (response) => {
        setCollaborations(response);
        setIsLoading(false);
      }
    );
  };

  const renderCollaborations = (collaborations) => {};

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
            <div className="view-wrap-item">
              <img
                className="view-avatar-item"
                src="https://i.imgur.com/cVDadwb.png"
                alt="icon avatar"
              />
              <div className="view-wrap-content-item">
                <span className="text-item">Nickname: Filip Jerga</span>
                <span className="text-item">online</span>
              </div>
            </div>
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
                <div className="view-wrap-item-left">
                  <div className="view-wrap-item-left-wrapper">
                    <img
                      src="https://i.imgur.com/cVDadwb.png"
                      alt="avatar"
                      className="peer-avatar-left"
                    />
                    <div className="view-item-left">
                      <span className="text-content-item">hey</span>
                    </div>
                  </div>
                  <span className="text-time-left">Oct 31, 2019</span>
                </div>
                <div className="view-wrap-item-right">
                  <div className="view-wrap-item-right-wrapper">
                    <div className="view-item-right">
                      <span className="text-content-item">hey</span>
                    </div>
                    <img
                      src="https://i.imgur.com/cVDadwb.png"
                      alt="avatar"
                      className="peer-avatar-right"
                    />
                  </div>
                  <span className="text-time-right">Oct 31, 2019</span>
                </div>
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
