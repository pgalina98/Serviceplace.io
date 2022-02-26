import React from "react";

import authenticatedBoundaryRoute from "../router/authenticated-boundary-route/authenticated-boundary-route";

const Profile = () => {
  return <div>Profile page</div>;
};

export default authenticatedBoundaryRoute(Profile);
