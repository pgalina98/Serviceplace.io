import React from "react";

import { BrowserRouter as Router } from "react-router-dom";

import Sidebar from "./components/sidebar/sidebar";
import Navbar from "components/navbar/navbar";
import Routes from "./router/routes";
import { connect } from "react-redux";

function App({ loggedUser, isAuthenticated }) {
  return (
    <Router>
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
    </Router>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authenticationState.isAuthenticated,
  loggedUser: state.authenticationState.loggedUser,
});

export default connect(mapStateToProps)(App);
