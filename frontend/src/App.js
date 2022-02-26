import React, { useEffect } from "react";

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
import * as api from "./firebase/api/controllers/authentication-controller";

function App({ loggedUser, isAuthenticated, isAuthenticationResolved }) {
  const dispatch = useDispatch();

  useEffect(() => {
    api.onAuthStateChange((user) => {
      dispatch(resetAuthenticationState());
      dispatch(setAuthenticatedUser(user));
    });
  }, [dispatch]);

  return (
    <Router>
      {!isAuthenticationResolved ? (
        <Spinner />
      ) : (
        <>
          <Navbar
            id="navbar"
            loggedUser={loggedUser}
            isAuthenticated={isAuthenticated}
          />
          <Navbar
            id="navbar-clone"
            loggedUser={loggedUser}
            isAuthenticated={isAuthenticated}
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
