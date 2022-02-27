import React from "react";
import { Routes as ReactRouterRoutes, Route } from "react-router-dom";

import Homepage from "../pages/homepage/homepage";
import FrequentlyAskedQuestions from "../pages/frequently-asked-questions/frequently-asked-questions";
import Profile from "../pages/profile/profile";
import Servkces from "../pages/services/services";
import Login from "../pages/login/login";
import Register from "../pages/register/register";
import ServkceDetails from "../pages/service/service-details";
import CreateService from "../pages/service/create-service";

const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/faq" element={<FrequentlyAskedQuestions />} />
      <Route exact path="/services" element={<Servkces />} />
      <Route exact path="/services/new" element={<CreateService />} />
      <Route exact path="/services/:id" element={<ServkceDetails />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/" element={<Homepage />} />
    </ReactRouterRoutes>
  );
};

export default Routes;
