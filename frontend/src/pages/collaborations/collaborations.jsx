import React, { useEffect, useRef, useState } from "react";

import {
  Alert,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";

import Spinner from "components/spinner/spinner";
import CollaborationItem from "components/collaboration/collaboration-item";
import Message from "components/message/message";

import { subscribe as subscribeToCollaborations } from "actions/collaboration-actions";
import { subscribe as subscribeToUsers } from "actions/user-actions";

import authenticatedBoundaryRoute from "router/authenticated-boundary-route/authenticated-boundary-route";

import { COLLABORATION_TAB } from "constants/collaboration-tab-constants";
import {
  COLLABORATION_STATUS,
  mapIdToStatus,
} from "constants/collaboration-status-constants";

import "./collaborations.scss";

const useIsMounted = () => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  return isMounted;
};

const Collaborations = ({ authenticationState }) => {
  const firstRenderRef = useRef(true);
  const isMounted = useIsMounted();

  const [activeTab, setActiveTab] = useState(COLLABORATION_TAB.JOINED);
  const [collaborations, setCollaborations] = useState();
  const [selectedCollaboration, setSelectedCollaboration] = useState();
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

    if (isMounted.current) {
      setCollaborations(updatedCollaborations);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  const onCollaborationItemClick = (collaboration) => {
    setSelectedCollaboration(collaboration);
  };

  const filterCollabrations = (collaborations, status) => {
    return collaborations.filter(
      (collaboration) => collaboration.status === mapIdToStatus(status)
    );
  };

  const getCollaborator = (collaboration) => {
    return collaboration.collaborators.find(
      (collaborator) => collaborator.id !== authenticationState.loggedUser.id
    );
  };

  const renderCollaborations = (collaborations, status) => {
    return filterCollabrations(collaborations, status).map((collaboration) => (
      <CollaborationItem
        key={collaboration.id}
        collaborator={getCollaborator(collaboration)}
        onCollaborationItemClick={() => onCollaborationItemClick(collaboration)}
      />
    ));
  };

  const renderPageContent = (activeTab) => {
    return (
      <div className="body">
        {filterCollabrations(
          collaborations,
          activeTab === COLLABORATION_TAB.JOINED
            ? COLLABORATION_STATUS.JOINED
            : COLLABORATION_STATUS.PENDING
        ).length === 0 ? (
          <div className="container">
            <div className="content-wrapper pt-3">
              <Alert color="primary">
                {`You don't have any ${mapIdToStatus(
                  activeTab === COLLABORATION_TAB.JOINED
                    ? COLLABORATION_STATUS.JOINED
                    : COLLABORATION_STATUS.PENDING
                )} collaborations yet!`}
              </Alert>
            </div>
          </div>
        ) : (
          <>
            <div className="view-list-user">
              {renderCollaborations(
                collaborations,
                activeTab === COLLABORATION_TAB.JOINED
                  ? COLLABORATION_STATUS.JOINED
                  : COLLABORATION_STATUS.PENDING
              )}
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
          </>
        )}
      </div>
    );
  };

  return (
    <div className="p-3 pt-0">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === COLLABORATION_TAB.JOINED,
            })}
            onClick={() => {
              setActiveTab(COLLABORATION_TAB.JOINED);
            }}
          >
            Joined
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === COLLABORATION_TAB.REQUESTS,
            })}
            onClick={() => {
              setActiveTab(COLLABORATION_TAB.REQUESTS);
            }}
          >
            Requests
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        {activeTab === COLLABORATION_TAB.JOINED ? (
          <TabPane tabId={COLLABORATION_TAB.JOINED}>
            <Row>
              <Col sm="12">
                <div className="root">
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    renderPageContent(COLLABORATION_TAB.JOINED)
                  )}
                </div>
              </Col>
            </Row>
          </TabPane>
        ) : (
          <TabPane tabId={COLLABORATION_TAB.REQUESTS}>
            <Row>
              <Col sm="12">
                <div className="root">
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    renderPageContent(COLLABORATION_TAB.REQUESTS)
                  )}
                </div>
              </Col>
            </Row>
          </TabPane>
        )}
      </TabContent>
    </div>
  );
};

export default authenticatedBoundaryRoute(Collaborations);
