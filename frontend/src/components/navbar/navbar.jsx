/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Notifications from "components/notifications/notifications";

import { logoutUser } from "../../actions/authentication-actions";

const Navbar = ({
  id,
  loggedUser,
  isAuthenticated,
  notifications,
  messages,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutButtonClick = () => {
    dispatch(logoutUser(loggedUser.id));
    navigate("/");
  };

  return (
    <nav
      id={id}
      className="navbar is-fresh is-transparent no-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item" style={{ marginBottom: 10 }}>
            <div className="title">Serviceplace.io</div>
          </Link>

          <a className="navbar-item is-hidden-desktop is-hidden-tablet">
            <div
              id="menu-icon-wrapper"
              className="menu-icon-wrapper"
              style={{ visibility: "visible" }}
            >
              <svg width="1000px" height="1000px">
                <path
                  className="path1"
                  d="M 300 400 L 700 400 C 900 400 900 750 600 850 A 400 400 0 0 1 200 200 L 800 800"
                ></path>
                <path className="path2" d="M 300 500 L 700 500"></path>
                <path
                  className="path3"
                  d="M 700 600 L 300 600 C 100 600 100 200 400 150 A 400 380 0 1 1 200 800 L 800 200"
                ></path>
              </svg>
              <button
                id="menu-icon-trigger"
                className="menu-icon-trigger"
              ></button>
            </div>
          </a>

          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbar-menu"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbar-menu" className="navbar-menu is-static">
          <div className="navbar-start">
            <a className="navbar-item is-hidden-mobile">
              <div
                id="menu-icon-wrapper"
                className="menu-icon-wrapper"
                style={{ visibility: "visible" }}
              >
                <svg width="1000px" height="1000px">
                  <path
                    className="path1"
                    d="M 300 400 L 700 400 C 900 400 900 750 600 850 A 400 400 0 0 1 200 200 L 800 800"
                  ></path>
                  <path className="path2" d="M 300 500 L 700 500"></path>
                  <path
                    className="path3"
                    d="M 700 600 L 300 600 C 100 600 100 200 400 150 A 400 380 0 1 1 200 800 L 800 200"
                  ></path>
                </svg>
                <button
                  id="menu-icon-trigger"
                  className="menu-icon-trigger"
                ></button>
              </div>
            </a>
          </div>

          <div className="navbar-end">
            {isAuthenticated && (
              <>
                <div className="navbar-item has-dropdown is-hoverable">
                  <a className="navbar-link">Services</a>

                  <div className="navbar-dropdown">
                    <a href="/services/new" className="navbar-item">
                      Create service
                    </a>
                    <a href="/services/own-services" className="navbar-item">
                      Your services
                    </a>
                  </div>
                </div>
                <div className="navbar-item has-dropdown is-hoverable">
                  <a className="navbar-link">Offers</a>

                  <div className="navbar-dropdown">
                    <a href="/offers/created-offers" className="navbar-item">
                      Created offers
                    </a>
                    <a href="/offers/received-offers" className="navbar-item">
                      Received offers
                    </a>
                  </div>
                </div>
              </>
            )}
            {isAuthenticated && (
              <>
                <div className="navbar-item is-secondary navbar-username">
                  Hi {loggedUser.fullname}
                </div>
                <div className="navbar-item has-dropdown is-hoverable">
                  <div className="notification">
                    <div
                      className={`notBtn ${
                        notifications.length === 0 && "noHover"
                      }`}
                    >
                      <div className="badge">{notifications.length}</div>
                      <i className="bi bi-bell" />
                      <Notifications notifications={notifications} />
                    </div>
                  </div>
                </div>
                <div className="navbar-item has-dropdown is-hoverable">
                  <div className="message">
                    <div
                      className="notBtn"
                      onClick={() => navigate("/collaborations")}
                    >
                      <div className="badge">{messages.length}</div>
                      <i className="bi bi-chat-text" />
                    </div>
                  </div>
                </div>
              </>
            )}
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="navbar-item is-secondary modal-trigger"
                  data-modal="auth-modal"
                >
                  Log in
                </Link>
                <Link to="/register" className="navbar-item">
                  <span className="button signup-button rounded secondary-btn raised">
                    Sign up
                  </span>
                </Link>
              </>
            ) : (
              <div className="navbar-item" onClick={handleLogoutButtonClick}>
                <span className="button is-danger signup-button rounded raised">
                  Logout
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
