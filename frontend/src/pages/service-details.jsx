import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useParams } from "react-router";

import { getServiceById } from "../actions/service-actions";

const ServiceDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [service, setService] = useState();

  useEffect(() => {
    dispatch(getServiceById(id)).then((service) => {
      setService(service.payload);
    });
  }, [id]);

  return (
    <section className="hero is-fullheight is-default is-bold">
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
              <p className="has-text-centered">
                <button className="button is-medium is-info is-outlined">
                  Get started
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  service: state.servicesState.selectedService,
});

export default connect(mapStateToProps)(ServiceDetails);
