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
import OwnServices from "../pages/services/own-services";
import CreatedOffers from "../pages/offers/created-offers";
import ReceivedOffers from "../pages/offers/received-offers";
import Collaboration from "pages/collaboration/collaboration";

const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/faq" element={<FrequentlyAskedQuestions />} />
      <Route exact path="/services" element={<Servkces />} />
      <Route exact path="/services/new" element={<CreateService />} />
      <Route exact path="/services/own-services" element={<OwnServices />} />
      <Route exact path="/services/:id" element={<ServkceDetails />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/offers/created-offers" element={<CreatedOffers />} />
      <Route path="/offers/received-offers" element={<ReceivedOffers />} />
      <Route path="/collaborations/:id" element={<Collaboration />} />
      <Route path="/" element={<Homepage />} />
    </ReactRouterRoutes>
  );
};

export default Routes;
