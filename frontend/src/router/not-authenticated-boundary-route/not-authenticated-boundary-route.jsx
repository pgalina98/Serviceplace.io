import React from "react";

import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const notAuthenticatedBoundaryRoute = (Component) => {
  const NotAuthenticatedBoundaryRoute = ({ authenticationState }) => {
    return authenticationState?.isAuthenticated ? (
      <Navigate to="/" />
    ) : (
      <Component />
    );
  };

  const mapStateToProps = (state) => ({
    authenticationState: state.authenticationState,
  });

  return connect(mapStateToProps)(NotAuthenticatedBoundaryRoute);
};

export default notAuthenticatedBoundaryRoute;
