import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
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
import { v4 as uuid } from "uuid";

import Spinner from "components/spinner/spinner";
import CollaborationItem from "components/collaboration/collaboration-item";
import Message from "components/message/message";
import TypingIndicator from "components/typing-indicator/typing-indicator";

import {
  getLoggedUserCollaborations,
  setSelectedCollaboration,
  updateCollaboratorStatus,
} from "actions/collaboration-actions";
import { setCollaboratorIsTypingStatus } from "actions/user-actions";

import authenticatedBoundaryRoute from "router/authenticated-boundary-route/authenticated-boundary-route";

import { COLLABORATION_TABS } from "constants/collaboration-tab-constants";
import {
  COLLABORATION_STATUS,
  mapIdToStatus,
} from "constants/collaboration-status-constants";
import { sendNewMessage } from "../../actions/message-actions";
import {
  onCollaboratorIsTypingStatusChange,
  onUsersConnectionsStateChange,
} from "../../firebase/api/controllers/users-controller";
import { onCollaborationMessagesChange } from "../../firebase/api/controllers/collaborations-controller";
import { ENTER } from "constants/keyboard-keys-constants";
import { NOTIFICATION_TYPES } from "constants/notification-type-constants";
import {
  getNotificationByCollaborationIdAndNotificationType,
  removeNotification,
} from "actions/notification-actions";

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
  const lastMessage = useRef();
  const isMounted = useIsMounted();
  const dispatch = useDispatch();

  const { selectedCollaboration } = useSelector(
    (state) => state.collaborationState
  );
  const [isCollaboratorTyping, setIsCollaboratorTyping] = useState(false);

  const [activeTab, setActiveTab] = useState(COLLABORATION_TABS.JOINED);
  const [collaborations, setCollaborations] = useState();
  const [activeUsers, setActiveUsers] = useState();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const scrollToBottom = () => lastMessage.current?.scrollIntoView();

  useEffect(() => {
    onUsersConnectionsStateChange((activeUsers) => {
      setActiveUsers(activeUsers);
    });
    fetchLoggedUserCollaborations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      if (selectedCollaboration) {
        const currentlySelectedCollaborationData = collaborations.find(
          (collaboration) => collaboration.id === selectedCollaboration.id
        );

        dispatch(setSelectedCollaboration(currentlySelectedCollaborationData));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collaborations]);

  useEffect(() => {
    if (selectedCollaboration) {
      onCollaboratorIsTypingStatusChange(
        selectedCollaboration.id,
        getCollaborator(selectedCollaboration).id,
        (isTyping) => {
          setIsCollaboratorTyping(isTyping);
          scrollToBottom();
        }
      );

      onCollaborationMessagesChange(selectedCollaboration.id, (messages) => {
        if (messages) {
          dispatch(
            setSelectedCollaboration({
              ...selectedCollaboration,
              messages: [...selectedCollaboration.messages, ...messages],
            })
          );
          scrollToBottom();
        }
      });
    }

    scrollToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCollaboration?.id]);

  useEffect(() => {
    if (selectedCollaboration) {
      setCollaboratorIsTypingStatus(
        selectedCollaboration.id,
        authenticationState.loggedUser.id,
        message.length > 0
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCollaboration, message]);

  const fetchLoggedUserCollaborations = () => {
    setIsLoading(true);

    getLoggedUserCollaborations(authenticationState.loggedUser.id)
      .then((collaborations) => {
        setCollaborations(collaborations);
      })
      .then(() => {
        setIsLoading(false);
      });
  };

  const isMessageSentByLoggedUser = (message) => {
    return message.fromUser.id === authenticationState.loggedUser.id;
  };

  const handleJoinButtonClick = (collaboration) => {
    setIsSaving(true);

    updateCollaboratorStatus(
      collaboration.id,
      authenticationState.loggedUser.id,
      true
    ).then(() => {
      getNotificationByCollaborationIdAndNotificationType(
        collaboration.id,
        NOTIFICATION_TYPES.COLLABORATION_INVITATION
      ).then((notification) => {
        removeNotification(notification);

        setIsSaving(false);
      });
    });
  };

  const isSendMessageButtonDisabled = () => {
    return message?.length === 0;
  };

  const onMessageTextChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessageButtonClick = () => {
    setMessage("");

    const newMessage = {
      fromUser: authenticationState.loggedUser,
      toUser: getCollaborator(selectedCollaboration),
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
        activeUsers={activeUsers}
        handleJoinButtonClick={() => handleJoinButtonClick(collaboration)}
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
                <Message
                  key={uuid()}
                  side={isMessageSentByLoggedUser(message) ? "right" : "left"}
                  data={message}
                />
              ))}
              <TypingIndicator
                forwardedRef={lastMessage}
                collaborator={getCollaborator(selectedCollaboration)}
                hidden={!isCollaboratorTyping}
              />
              <div
                style={{ float: "left", clear: "both", backgroundColor: "red" }}
              />
              <div ref={lastMessage} />
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
            onKeyPress={(event) => {
              if (event.key === ENTER) {
                handleSendMessageButtonClick();
              }
            }}
          />
          <div
            className="send-icon-button"
            onClick={(event) => {
              isSendMessageButtonDisabled()
                ? event.preventDefault()
                : handleSendMessageButtonClick();
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
          activeTab === COLLABORATION_TABS.JOINED
            ? COLLABORATION_STATUS.JOINED
            : COLLABORATION_STATUS.PENDING
        ).length === 0 ? (
          <div className="container">
            <div className="content-wrapper pt-3">
              <Alert color="primary">
                {`You don't have any collaborations in status ${mapIdToStatus(
                  activeTab === COLLABORATION_TABS.JOINED
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
                activeTab === COLLABORATION_TABS.JOINED
                  ? COLLABORATION_STATUS.JOINED
                  : COLLABORATION_STATUS.PENDING
              )}
            </div>
            <div className="view-board">
              {selectedCollaboration && activeTab === COLLABORATION_TABS.JOINED
                ? renderSelectedCollaborationMessages()
                : activeTab === COLLABORATION_TABS.JOINED && (
                    <div className="container">
                      <div className="content-wrapper pt-3">
                        <Alert color="primary">
                          Select collaboration and start conversation! :)
                        </Alert>
                      </div>
                    </div>
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
              active: activeTab === COLLABORATION_TABS.JOINED,
            })}
            onClick={() => {
              setActiveTab(COLLABORATION_TABS.JOINED);
            }}
          >
            Joined
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === COLLABORATION_TABS.REQUESTS,
            })}
            onClick={() => {
              setActiveTab(COLLABORATION_TABS.REQUESTS);
            }}
          >
            Requests
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        {activeTab === COLLABORATION_TABS.JOINED ? (
          <TabPane tabId={COLLABORATION_TABS.JOINED}>
            <Row>
              <Col sm="12">
                <div className="root">
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    renderPageContent(COLLABORATION_TABS.JOINED)
                  )}
                </div>
              </Col>
            </Row>
          </TabPane>
        ) : (
          <TabPane tabId={COLLABORATION_TABS.REQUESTS}>
            <Row>
              <Col sm="12">
                <div className="root">
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    renderPageContent(COLLABORATION_TABS.REQUESTS)
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
