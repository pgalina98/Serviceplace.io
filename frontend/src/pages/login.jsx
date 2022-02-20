/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { TOAST_TYPES } from "utils/toast-util";

import { setAuthenticatedUser } from "../actions/authentication-actions";

import * as api from "../firebase/api/controllers/authentication-controller";

const Login = () => {
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [isProceedingData, setIsProceedingData] = useState(false);

  const handleLoginButtonClicked = (data) => {
    setIsProceedingData(true);

    api
      .authenticateUser(data)
      .then(({ user }) => {
        dispatch(setAuthenticatedUser(user));
        setIsProceedingData(false);
        navigate("/");
      })
      .catch(({ message }) => {
        setIsProceedingData(false);
        addToast(message, { appearance: TOAST_TYPES.ERROR });
      });
  };

  return (
    <div className="auth-page">
      <div className="container has-text-centered">
        <div className="column is-4 is-offset-4">
          <h3 className="title has-text-grey">Login</h3>
          <p className="subtitle has-text-grey">Please login to proceed.</p>
          <div className="box">
            <figure className="avatar">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDtUSMTukZTR-a8r3sPbSzUeVwO9JKPsqgCQ&usqp=CAU"
                alt="avatar"
              />
            </figure>
            <form onSubmit={handleSubmit(handleLoginButtonClicked)}>
              <div className="field">
                <div className="control">
                  <input
                    {...register("email", {
                      required: true,
                      pattern:
                        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
                    })}
                    name="email"
                    className="input is-large"
                    type="email"
                    placeholder="Your Email"
                    autoFocus=""
                    autoComplete="email"
                  />
                  {errors.email && (
                    <div className="form-error">
                      {errors.email.type === "required" ? (
                        <span className="help is-danger">
                          Email is required
                        </span>
                      ) : (
                        <span className="help is-danger">
                          Email address is not valid
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <input
                    {...register("password", {
                      required: true,
                    })}
                    name="password"
                    className="input is-large"
                    type="password"
                    placeholder="Your Password"
                    autoComplete="current-password"
                  />
                  {errors.email && (
                    <div className="form-error">
                      <span className="help is-danger">
                        Password is required
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="button is-block is-info is-large is-fullwidth"
                disabled={isProceedingData}
              >
                {isProceedingData ? (
                  <Spinner as="span" animation="border" />
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </div>
          <p className="has-text-grey">
            <a>Sign In With Google</a>&nbsp;
            <a href="/register">Sign Up</a> &nbsp;·&nbsp;
            <a href="../">Need Help?</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
