/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";

import { connect } from "react-redux";

import { getServices } from "actions/service-actions";

import ServiceCard from "../../components/service-card/service-card";
import Spinner from "../../components/spinner/spinner";

class Homepage extends React.Component {
  state = {
    services: [],
    isLoading: true,
  };

  componentDidMount() {
    this.setState({ ...this.state.services, isLoading: true });

    this.props.dispatch(getServices()).then((services) => {
      this.setState({ services: services.payload, isLoading: false });
    });
  }

  renderServices = (services) => {
    return services.map((service) => (
      <ServiceCard key={service.id} data={service} />
    ));
  };

  render() {
    const { services, isLoading } = this.state;

    if (isLoading) {
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
                    Alone we can do so little, together we can do so much...
                  </h2>
                  <p>
                    <a className="button cta rounded primary-btn raised">
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
        </section>

        <section className="section section-feature-grey is-medium">
          <div className="container">
            <div className="title-wrapper has-text-centered">
              <h2 className="title is-2">Great Power Comes </h2>
              <h3 className="subtitle is-5 is-muted">
                With great Responsability
              </h3>
              <div className="divider is-centered"></div>
            </div>

            <div className="content-wrapper">
              <div className="columns is-multiline">
                {this.renderServices(services)}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ services: state.servicesState.services });

export default connect(mapStateToProps)(Homepage);
