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

import {
  subscribe as subscribeToCollaborations,
  updateCollaboratorStatus,
} from "actions/collaboration-actions";
import { subscribe as subscribeToUsers } from "actions/user-actions";

import authenticatedBoundaryRoute from "router/authenticated-boundary-route/authenticated-boundary-route";

import { COLLABORATION_TAB } from "constants/collaboration-tab-constants";
import {
  COLLABORATION_STATUS,
  mapIdToStatus,
} from "constants/collaboration-status-constants";

import "./collaborations.scss";
import { sendNewMessage } from "../../actions/message-actions";

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
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

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
        if (selectedCollaboration) {
          const currentlySelectedCollaborationData = collaborations.find(
            (collaboration) => collaboration.id === selectedCollaboration.id
          );

          setSelectedCollaboration(currentlySelectedCollaborationData);
        }
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

  const onJoinButtonClick = (collaboration) => {
    setIsSaving(true);

    updateCollaboratorStatus(
      collaboration.id,
      authenticationState.loggedUser.id,
      true
    ).then(() => {
      setIsSaving(false);
    });
  };

  const onCollaborationItemClick = (collaboration) => {
    console.log("SELECTAM COLLABORATION: ", collaboration);
    setSelectedCollaboration(collaboration);
  };

  const isSendMessageButtonDisabled = () => {
    return message?.length === 0;
  };

  const onMessageTextChange = (event) => {
    setMessage(event.target.value);
  };

  const onSendMessageButtonClick = () => {
    setMessage("");

    const newMessage = {
      fromUser: authenticationState.loggedUser.id,
      toUser: getCollaborator(selectedCollaboration).id,
      text: message,
    };

    sendNewMessage(selectedCollaboration.id, newMessage);
  };

  const isCollaborationItemSelected = (collaboration) => {
    return selectedCollaboration
      ? selectedCollaboration.id === collaboration.id
      : false;
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
        collaboration={collaboration}
        collaborator={getCollaborator(collaboration)}
        onJoinButtonClick={() => onJoinButtonClick(collaboration)}
        onCollaborationItemClick={() => onCollaborationItemClick(collaboration)}
        isCollaborationItemSelected={isCollaborationItemSelected(collaboration)}
        isSaving={isSaving}
      />
    ));
  };

  const renderSelectedCollaborationMessages = () => {
    return (
      <div className="view-chat-board">
        <div className="header-chat-board">
          <img
            className="view-avatar-item"
            src={getCollaborator(selectedCollaboration).avatar}
            alt="icon avatar"
          />
          <span className="text-header-chat-board">
            {`${getCollaborator(selectedCollaboration).fullname} |
              ${selectedCollaboration.offer.service.title}`}
          </span>
        </div>
        <div className="view-list-content-chat">
          {selectedCollaboration.messages.length > 0 ? (
            <>
              {selectedCollaboration.messages.map((message) => (
                <Message key={message.id} side="left" message={message} />
              ))}
              <div style={{ float: "left", clear: "both" }}></div>
            </>
          ) : (
            <div className="container">
              <div className="content-wrapper pt-3 pb-0">
                <Alert color="primary">
                  This conversation has no messages yet! Be first who will send
                  message inside this conversation :)
                </Alert>
                <img
                  className="collaboration-illustration"
                  src="https://img.freepik.com/free-vector/texting-concept-illustration_114360-2744.jpg?t=st=1649577613~exp=1649578213~hmac=611eb0500f1e2fdd8435804c68e1aa8d0e5b4d5d329d5364ad1578772c503f43&w=1380"
                  alt="messaging-illustration"
                />
              </div>
            </div>
          )}
        </div>
        <div className="view-bottom">
          <input
            className="view-input"
            placeholder="Type your message..."
            value={message}
            onChange={onMessageTextChange}
          />
          <div
            className="send-icon-button"
            onClick={(event) => {
              isSendMessageButtonDisabled()
                ? event.preventDefault()
                : onSendMessageButtonClick();
            }}
          >
            <i className="bi bi-send icon" />
          </div>
        </div>
      </div>
    );
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
                {`You don't have any collaborations in status ${mapIdToStatus(
                  activeTab === COLLABORATION_TAB.JOINED
                    ? COLLABORATION_STATUS.JOINED
                    : COLLABORATION_STATUS.PENDING
                ).toLocaleLowerCase()} yet!`}
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
              {!selectedCollaboration ? (
                <div className="container">
                  <div className="content-wrapper pt-3">
                    <Alert color="primary">
                      Select collaboration and start conversation! :)
                    </Alert>
                  </div>
                </div>
              ) : (
                renderSelectedCollaborationMessages()
              )}
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
