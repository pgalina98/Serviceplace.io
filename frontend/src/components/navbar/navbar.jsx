/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { logoutUser } from "../../actions/authentication-actions";

const Navbar = ({ id, loggedUser, isAuthenticated, messages }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutButtonClick = () => {
    dispatch(logoutUser());
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
                  <div class="notification">
                    <div class="notBtn" href="#">
                      <div class="badge">{messages.length}</div>
                      <i class="bi bi-bell"></i>
                      <div class="box">
                        <div class="display">
                          <div class="nothing">
                            <i class="fas fa-child stick"></i>
                            <div class="cent">No notifications yet!</div>
                          </div>
                          <div class="cont">
                            <div class="sec new">
                              <a href="https://codepen.io/Golez/">
                                <div class="profCont">
                                  <img
                                    class="profile"
                                    src="https://c1.staticflickr.com/5/4007/4626436851_5629a97f30_b.jpg"
                                  />
                                </div>
                                <div class="txt">
                                  James liked your post: "Pure css notification
                                  box"
                                </div>
                                <div class="txt sub">11/7 - 2:30 pm</div>
                              </a>
                            </div>
                            <div class="sec new">
                              <a href="https://codepen.io/Golez/">
                                <div class="profCont">
                                  <img
                                    class="profile"
                                    src="https://obamawhitehouse.archives.gov/sites/obamawhitehouse.archives.gov/files/styles/person_medium_photo/public/person-photo/amanda_lucidon22.jpg?itok=JFPi8OFJ"
                                  />
                                </div>
                                <div class="txt">
                                  Annita liked your post: "Pure css notification
                                  box"
                                </div>
                                <div class="txt sub">11/7 - 2:13 pm</div>
                              </a>
                            </div>
                            <div class="sec">
                              <a href="https://codepen.io/Golez/">
                                <div class="profCont">
                                  <img
                                    class="profile"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3O45RK9qyCrZJivYsY6PmeVEJH07l7bkoolJmscBsNjzump27"
                                  />
                                </div>
                                <div class="txt">
                                  Brie liked your post: "Pure css notification
                                  box"
                                </div>
                                <div class="txt sub">11/6 - 9:35 pm</div>
                              </a>
                            </div>
                            <div class="sec">
                              <a href="https://codepen.io/Golez/">
                                <div class="profCont">
                                  <img
                                    class="profile"
                                    src="https://c1.staticflickr.com/4/3725/10214643804_75c0b6eeab_b.jpg"
                                  />
                                </div>
                                <div class="txt">
                                  Madison liked your post: "Pure css
                                  notification box"
                                </div>
                                <div class="txt sub">11/6 - 4:04 pm</div>
                              </a>
                            </div>
                            <div class="sec">
                              <a href="https://codepen.io/Golez/">
                                <div class="profCont">
                                  <img
                                    class="profile"
                                    src="https://upload.wikimedia.org/wikipedia/commons/5/52/NG_headshot_white_shirt_square_Jan18.jpg"
                                  />
                                </div>
                                <div class="txt">
                                  Ted liked your post: "Pure css notification
                                  box"
                                </div>
                                <div class="txt sub">11/6 - 10:37 am</div>
                              </a>
                            </div>
                            <div class="sec">
                              <a href="https://codepen.io/Golez/">
                                <div class="profCont">
                                  <img
                                    class="profile"
                                    src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Pat-headshot-square.jpg"
                                  />
                                </div>
                                <div class="txt">
                                  Tommas liked your post: "Pure css notification
                                  box"
                                </div>
                                <div class="txt sub">11/5 - 7:30 pm</div>
                              </a>
                            </div>
                            <div class="sec">
                              <a href="https://codepen.io/Golez/">
                                <div class="profCont">
                                  <img
                                    class="profile"
                                    src="https://c1.staticflickr.com/8/7407/13785133614_6254abb8c4.jpg"
                                  />
                                </div>
                                <div class="txt">
                                  Claire liked your post: "Pure css notification
                                  box"
                                </div>
                                <div class="txt sub">11/5 - 2:30 pm</div>
                              </a>
                            </div>
                            <div class="sec">
                              <a href="https://codepen.io/Golez/">
                                <div class="profCont">
                                  <img
                                    class="profile"
                                    src="//c1.staticflickr.com/1/185/440890151_54c5b920b0_b.jpg"
                                  />
                                </div>
                                <div class="txt">
                                  Jerimaiah liked your post: "Pure css
                                  notification box"
                                </div>
                                <div class="txt sub">11/5 - 1:34 pm</div>
                              </a>
                            </div>
                            <div class="sec">
                              <a href="https://codepen.io/Golez/">
                                <div class="profCont">
                                  <img
                                    class="profile"
                                    src="//c2.staticflickr.com/4/3397/3585544855_28442029a5_z.jpg?zz=1"
                                  />
                                </div>
                                <div class="txt">
                                  Debra liked your post: "Pure css notification
                                  box"
                                </div>
                                <div class="txt sub">11/5 - 10:20 am</div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
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
