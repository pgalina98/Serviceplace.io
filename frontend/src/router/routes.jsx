import React from "react";
import { Routes as ReactRouterRoutes, Route } from "react-router-dom";

import Homepage from "../pages/homepage";
import FrequentlyAskedQuestions from "../pages/frequently-asked-questions";
import Profile from "../pages/profile";
import Servkces from "../pages/services";
import Login from "../pages/login";
import Register from "../pages/register";
import ServkceDetails from "../pages/service-details";

const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/faq" element={<FrequentlyAskedQuestions />} />
      <Route path="/services" element={<Servkces />} />
      <Route path="/services/:id" element={<ServkceDetails />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/" element={<Homepage />} />
    </ReactRouterRoutes>
  );
};

export default Routes;
