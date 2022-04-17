/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { useRef, useState, useEffect } from "react";

import { connect } from "react-redux";

import TypeWriterEffect from "react-typewriter-effect";

import { getServices } from "actions/service-actions";

import ServiceCard from "../../components/service-card/service-card";
import Spinner from "../../components/spinner/spinner";

const Homepage = (props) => {
  const availableServices = useRef();

  const scrollToBottom = () => availableServices.current?.scrollIntoView();

  useEffect(() => {
    fetchServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchServices = () => {
    props.dispatch(getServices());
  };

  const renderServices = (services) => {
    return services.map((service) => (
      <ServiceCard key={service.id} data={service} />
    ));
  };

  if (!props.services) {
    return <Spinner />;
  }

  return (
    <div>
      <section className="hero is-default is-bold">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-vcentered">
              <div className="column is-5 is-offset-1 landing-caption">
                <h1 className="title is-1 is-bold is-spaced">
                  Learn, Collaborate.
                </h1>
                <h2 className="subtitle is-5 is-muted">
                  <TypeWriterEffect
                    textStyle={{
                      fontFamily: "Open Sans",
                      color: "#3F3D56",
                      fontWeight: 500,
                      fontSize: "1.5em",
                    }}
                    startDelay={200}
                    cursorColor="#3F3D56"
                    multiText={[
                      "This app will help you to hone your skills more and more",
                      "Scroll down and start your learning journey",
                      "It's easy, just select service, make offer, start collaboration and enjoy",
                    ]}
                    multiTextDelay={2000}
                    typeSpeed={85}
                  />
                </h2>
                <p>
                  <a
                    className="button cta rounded primary-btn raised"
                    onClick={() => scrollToBottom()}
                  >
                    Get Started
                  </a>
                </p>
              </div>
              <div className="column is-5 is-offset-1">
                <figure className="image is-4by3">
                  <img
                    src={process.env.PUBLIC_URL + "/worker.svg"}
                    alt="Description"
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
        <section
          id="section"
          class="scroll-icon"
          onClick={() => scrollToBottom()}
        >
          <a>
            <span></span>Scroll
          </a>
        </section>
      </section>
      <section
        ref={availableServices}
        className="section section-feature-grey is-medium"
        style={{ paddingBottom: "20px" }}
      >
        <div className="container">
          <div className="title-wrapper has-text-centered">
            <h2 className="title is-2">Discover services</h2>
            <h3 className="subtitle is-5 is-muted">Currently available</h3>
            <div className="divider is-centered"></div>
          </div>
          <div className="content-wrapper" style={{ paddingBottom: "20px" }}>
            <div className="columns is-multiline">
              {renderServices(props.services)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({ services: state.servicesState.services });

export default connect(mapStateToProps)(Homepage);
