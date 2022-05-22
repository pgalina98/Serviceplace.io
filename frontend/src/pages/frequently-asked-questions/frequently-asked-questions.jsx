import React from "react";

import authenticatedBoundaryRoute from "router/authenticated-boundary-route/authenticated-boundary-route";

const FrequentlyAskedQuestions = () => {
  return <div>Frequently asked quetions page</div>;
};

export default authenticatedBoundaryRoute(FrequentlyAskedQuestions);
