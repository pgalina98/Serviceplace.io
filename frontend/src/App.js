import React from "react";

import { BrowserRouter as Router } from "react-router-dom";

import Sidebar from "./components/sidebar/sidebar";
import Navbar from "components/navbar/navbar";
import Routes from "./router/routes";
import { connect } from "react-redux";

function App({ loggedUser }) {
  // const authenticationState = useSelector((state) => state.authenticationState);

  return (
    <Router>
      <Navbar id="navbar" loggedUser={loggedUser} />
      <Navbar id="navbar-clone" loggedUser={loggedUser} />
      <Sidebar />
      <Routes />
    </Router>
  );
}

const mapStateToProps = (state) => ({
  loggedUser: state.authenticationState.loggedUser,
});

export default connect(mapStateToProps)(App);
