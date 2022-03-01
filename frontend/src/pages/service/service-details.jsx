/* eslint react-hooks/exhaustive-deps: 0 */

import React, { useEffect, useState } from "react";

import { connect, useDispatch } from "react-redux";
import { useParams } from "react-router";
import Spinner from "../../components/spinner/spinner";

import authenticatedBoundaryRoute from "../../router/authenticated-boundary-route/authenticated-boundary-route";
import { getServiceById } from "../../actions/service-actions";
import OfferModal from "../../components/offer-modal/offer-modal";

import * as api from "../../firebase/api/controllers/users-controller";

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
      api.getUserById(service.payload.uid).then((response) => {
        const user = response.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));

        setService({
          ...service.payload,
          createdBy: Object.assign({}, ...user),
        });

        setIsLoading(false);
      });
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  const isServiceCreatedByLoggedUser = () => {
    return service.uid === authenticationState.loggedUser.uid;
  };

  return (
    <div className="hero-body">
      <div className="container has-text-centered">
        <div className="columns is-vcentered">
          <div className="column is-5">
            <figure className="image is-4by3">
              <img src={service?.image} alt="Description" />
            </figure>
          </div>
          <div className="column is-6 is-offset-1">
            <h1 className="title is-2">{service?.title}</h1>
            <h2 className="subtitle is-4">{service?.description}</h2>
            <br />
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
