import React, { useEffect, useState } from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { connect, useDispatch } from "react-redux";

import Spinner from "components/spinner/spinner";
import Sidebar from "./components/sidebar/sidebar";
import Navbar from "components/navbar/navbar";
import Routes from "./router/routes";

import {
  setAuthenticatedUser,
  resetAuthenticationState,
  onAuthStateChange,
} from "actions/authentication-actions";
import { subscribe as subscribeToNotifications } from "actions/notification-actions";
import { subscribeToMessages } from "actions/message-actions";

import { onConnectionStateChange } from "./firebase/api/controllers/users-controller";

function App({ loggedUser, isAuthenticated, isAuthenticationResolved }) {
  const dispatch = useDispatch();

  const [notifications, setNotifications] = useState({
    data: [],
    isFetching: isAuthenticationResolved && isAuthenticated,
  });

  const [messages, setMessages] = useState({
    data: [],
    isFetching: isAuthenticationResolved && isAuthenticated,
  });

  useEffect(() => {
    onAuthStateChange((user) => {
      dispatch(resetAuthenticationState());
      dispatch(setAuthenticatedUser(user));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isAuthenticationResolved && isAuthenticated) {
      subscribeToNotifications(loggedUser.id, (notifications) => {
        setNotifications({ data: notifications, isFetching: false });
      });
      subscribeToMessages(loggedUser.id, (messages) => {
        setMessages({ data: messages, isFetching: false });
      });
      onConnectionStateChange(loggedUser.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticationResolved, loggedUser]);

  return (
    <Router>
      {!isAuthenticationResolved || notifications.isFetching ? (
        <Spinner />
      ) : (
        <>
          <Navbar
            id="navbar"
            loggedUser={loggedUser}
            isAuthenticated={isAuthenticated}
            notifications={notifications.data}
            messages={messages.data}
          />
          <Navbar
            id="navbar-clone"
            loggedUser={loggedUser}
            isAuthenticated={isAuthenticated}
            notifications={notifications.data}
            messages={messages.data}
          />
          <Sidebar />
          <Routes />
        </>
      )}
    </Router>
  );
}

const mapStateToProps = (state) => ({
  loggedUser: state.authenticationState.loggedUser,
  isAuthenticated: state.authenticationState.isAuthenticated,
  isAuthenticationResolved: state.authenticationState.isAuthenticationResolved,
});

export default connect(mapStateToProps)(App);
