import React from "react";

import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const authenticatedBoundaryRoute = (Component) => {
  const AuthenticatedBoundaryRoute = ({ authenticationState }) => {
    return authenticationState?.isAuthenticated ? (
      <Component />
    ) : (
      <Navigate to="/login" />
    );
  };

  const mapStateToProps = (state) => ({
    authenticationState: state.authenticationState,
  });

  return connect(mapStateToProps)(AuthenticatedBoundaryRoute);
};

export default authenticatedBoundaryRoute;
