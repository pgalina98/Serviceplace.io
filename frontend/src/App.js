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
} from "actions/authentication-actions";
import { subscribe } from "actions/messages-actions";

import * as api from "./firebase/api/controllers/authentication-controller";

function App({ loggedUser, isAuthenticated, isAuthenticationResolved }) {
  const dispatch = useDispatch();

  const [unsubscribe, setUnsubscribe] = useState();
  const [messages, setMessages] = useState();

  useEffect(() => {
    api.onAuthStateChange((user) => {
      dispatch(resetAuthenticationState());
      dispatch(setAuthenticatedUser(user));

      if (user) {
        subscribe(user.uid, (response) => {
          setMessages(response.messages);
          setUnsubscribe(response.unsubscribe);
        });
      }
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      {!isAuthenticationResolved || !messages ? (
        <Spinner />
      ) : (
        <>
          <Navbar
            id="navbar"
            loggedUser={loggedUser}
            isAuthenticated={isAuthenticated}
            messages={messages}
          />
          <Navbar
            id="navbar-clone"
            loggedUser={loggedUser}
            isAuthenticated={isAuthenticated}
            messages={messages}
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
