/* eslint react-hooks/exhaustive-deps: 0 */

import React, { useEffect, useState } from "react";

import { connect, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { format } from "timeago.js";

import Spinner from "../../components/spinner/spinner";
import authenticatedBoundaryRoute from "../../router/authenticated-boundary-route/authenticated-boundary-route";
import { getServiceById } from "../../actions/service-actions";
import OfferModal from "../../components/offer-modal/offer-modal";
import SerivceStatsCard from "../../components/service-stats-card/service-stats-card";

const ServiceDetails = ({ authenticationState }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

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

  if (isLoading) {
    return <Spinner />;
  }

  const convertToMiliseconds = (createdAt) => {
    return createdAt * 1000;
  };

  const isServiceCreatedByLoggedUser = () => {
    return service.createdBy.id === authenticationState.loggedUser.id;
  };

  const createNicknameTag = () => {
    return `@${service.createdBy.email.split("@")[0]}`;
  };

  return (
    <div className="mt-30">
      <div className="container has-text-centered">
        <div className="columns is-vcentered">
          <div className="column is-5" style={{ paddingBottom: 0 }}>
            <SerivceStatsCard />
          </div>
          <div
            className="column is-7 rounded-10 service-card-details"
            style={{
              marginTop: "12px",
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
                <div className="content" style={{ padding: 0 }}>
                  <p>
                    <strong>{service.createdBy.fullname}</strong>{" "}
                    <small>
                      {format(
                        new Date(
                          convertToMiliseconds(service?.createdAt.seconds)
                        )
                      )}
                    </small>
                    <br />
                    <small>{createNicknameTag()}</small> <br />
                    <div className="mt-3">
                      <h4 className="title is-4">{service?.title}</h4>
                      <p className="subtitle is-5">{service?.description}</p>
                    </div>
                  </p>
                </div>
              </div>
            </article>
            <OfferModal
              isOfferButtonHidden={isServiceCreatedByLoggedUser()}
              service={service}
            />
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
