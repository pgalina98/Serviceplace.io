/* eslint react-hooks/exhaustive-deps: 0 */

import React, { useEffect, useState } from "react";

import { connect, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { format } from "timeago.js";

import Spinner from "components/utils/spinner/spinner";
import authenticatedBoundaryRoute from "router/authenticated-boundary-route/authenticated-boundary-route";
import { getServiceById } from "actions/service-actions";
import OfferModal from "components/modals/offer-modal/offer-modal";
import SerivceStatsCard from "components/cards/service-stats-card/service-stats-card";
import { OFFER_STATUS } from "constants/offer-status-constants";
import { Alert } from "reactstrap";
import LikeButton from "components/buttons/like-button/like-button";
import { likeServiceById } from "actions/service-actions";

const ServiceDetails = ({ authenticationState }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loggedUser } = authenticationState;

  const [isLoading, setIsLoading] = useState(true);

  const [service, setService] = useState();

  useEffect(() => {
    fetchServiceById(id);
  }, [id]);

  const fetchServiceById = (id) => {
    setIsLoading(true);

    dispatch(getServiceById(id)).then((service) => {
      setService({
        ...service.payload,
      });
      setIsLoading(false);
    });
  };

  const handleLikeButtonClick = () => {
    likeServiceById(service.id, loggedUser.id).then((response) => {
      setService({ ...service, likes: response.likes });
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  const hasLoggedUserActiveOfferForService = () => {
    return service.offers.some(
      (offer) =>
        offer.fromUser.id === loggedUser.id &&
        OFFER_STATUS.FINISHED !== offer.status
    );
  };

  const hasLoggedUserFinishedOfferForService = () => {
    return service.offers.some(
      (offer) =>
        offer.fromUser.id === loggedUser.id &&
        OFFER_STATUS.FINISHED === offer.status
    );
  };

  const isServiceCreatedByLoggedUser = () => {
    return service.createdBy.id === loggedUser.id;
  };

  const isLikeButtonActive = () => {
    return service.likes.some((user) => user.id === loggedUser.id);
  };

  const createNicknameTag = () => {
    return `@${service.createdBy.email.split("@")[0]}`;
  };

  const convertToMiliseconds = (createdAt) => {
    return createdAt * 1000;
  };

  return (
    <div className="mt-30">
      <div className="container has-text-centered">
        {hasLoggedUserActiveOfferForService() && (
          <Alert color="primary">
            You already have active collaboration for this service!
          </Alert>
        )}
        <div className="columns is-vcentered">
          <div className="column is-5 pb-0">
            <SerivceStatsCard />
          </div>
          <div
            className="rounded-10 service-card-details mt-12"
            style={{
              boxShadow: "0 8px 16px -8px rgba(0, 0, 0, 0.4)",
            }}
          >
            <article className="media">
              <figure className="media-left">
                <p className="image is-64x64">
                  <img src={service.createdBy.avatar} alt="avatar" />
                </p>
              </figure>
              <div className="media-content">
                <div className="content p-0">
                  <strong>{service.createdBy.fullname}</strong>{" "}
                  <small>
                    {format(
                      new Date(convertToMiliseconds(service?.createdAt.seconds))
                    )}
                  </small>
                  <br />
                  <small>{createNicknameTag()}</small> <br />
                  <div className="mt-3">
                    <h4 className="title is-4">{service?.title}</h4>
                    <p className="subtitle is-5">{service?.description}</p>
                  </div>
                </div>
              </div>
            </article>
            <div className="d-flex position-relative">
              <OfferModal
                isOfferButtonHidden={
                  isServiceCreatedByLoggedUser() ||
                  hasLoggedUserActiveOfferForService()
                }
                service={service}
              />
              <div className="d-flex flex-direction-column ml-auto">
                <LikeButton
                  hasLoggedUserFinishedOfferForService={hasLoggedUserFinishedOfferForService()}
                  isActive={isLikeButtonActive()}
                  handleLikeButtonClick={handleLikeButtonClick}
                />
                <small>
                  {isLikeButtonActive()
                    ? service.likes.length === 1
                      ? `You and 0 others`
                      : `You and ${service.likes.length} others`
                    : `${service.likes.length} others`}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  service: state.servicesState.selectedService,
});

export default connect(mapStateToProps)(
  authenticatedBoundaryRoute(ServiceDetails)
);
