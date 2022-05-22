/* eslint jsx-a11y/anchor-is-valid: 0 */
/* eslint no-useless-escape: 0 */

import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { Spinner } from "react-bootstrap";

import notAuthenticatedBoundaryRoute from "router/not-authenticated-boundary-route/not-authenticated-boundary-route";

import { TOAST_TYPES } from "utils/toast-util";
import * as api from "../../firebase/api/controllers/authentication-controller";
import { messages } from "config/constants";
import { isValidImage, isConfirmationPasswordMatched } from "helpers/validator";

const Register = () => {
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();

  const [isSavingData, setIsSavingData] = useState(false);

  const handleRegisterButtonClick = (data) => {
    setIsSavingData(true);

    api
      .registerUser(data)
      .then(() => {
        addToast(messages.REGISTER_SUCCESS, {
          appearance: TOAST_TYPES.SUCCESS,
        });
        setIsSavingData(false);
        navigate("/");
      })
      .catch(({ message }) => {
        setIsSavingData(false);
        addToast(message, { appearance: TOAST_TYPES.ERROR });
      });
  };

  return (
    <div className="auth-page">
      <div className="container has-text-centered">
        <div className="column is-4 is-offset-4">
          <h3 className="title has-text-grey">Register</h3>
          <p className="subtitle has-text-grey">Please Register to proceed.</p>
          <div className="box">
            <figure className="avatar">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDtUSMTukZTR-a8r3sPbSzUeVwO9JKPsqgCQ&usqp=CAU"
                alt="avatar"
              />
            </figure>
            <form onSubmit={handleSubmit(handleRegisterButtonClick)}>
              <div className="field">
                <div className="control">
                  <input
                    {...register("email", {
                      required: true,
                      pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
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
                    {...register("fullname", {
                      required: true,
                      minLength: 10,
                    })}
                    name="fullname"
                    className="input is-large"
                    type="text"
                    placeholder="Full Name"
                    autoFocus=""
                  />
                  {errors.fullname && (
                    <div className="form-error">
                      {errors.fullname.type === "required" ? (
                        <span className="help is-danger">
                          Fullname is required
                        </span>
                      ) : (
                        <span className="help is-danger">
                          Fullname must contains at least 10 characters
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <input
                    {...register("avatar", {
                      required: true,
                      validate: { isValidImage },
                    })}
                    name="avatar"
                    className="input is-large"
                    type="text"
                    placeholder="Avatar"
                    autoFocus=""
                  />
                  {errors.avatar && (
                    <div className="form-error">
                      {errors.avatar.type === "required" ? (
                        <span className="help is-danger">
                          Image is required
                        </span>
                      ) : (
                        <span className="help is-danger">
                          Image extension is not valid
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
                      minLength: 7,
                    })}
                    name="password"
                    className="input is-large"
                    type="password"
                    placeholder="Your Password"
                    autoComplete="current-password"
                  />
                  {errors.password && (
                    <div className="form-error">
                      {errors.password.type === "required" ? (
                        <span className="help is-danger">
                          Password is required
                        </span>
                      ) : (
                        <span className="help is-danger">
                          Password must contains at least 7 characters
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <input
                    {...register("passwordConfirmation", {
                      required: true,
                      minLength: 7,
                      validate: {
                        isConfirmationPasswordMatched: isConfirmationPasswordMatched(
                          getValues
                        ),
                      },
                    })}
                    name="passwordConfirmation"
                    className="input is-large"
                    type="password"
                    placeholder="Repeat Password"
                    autoComplete="current-password"
                  />
                  {errors.passwordConfirmation && (
                    <div className="form-error">
                      {errors.passwordConfirmation.type === "required" ? (
                        <span className="help is-danger">
                          Password Confirmation is required
                        </span>
                      ) : errors.passwordConfirmation.type ===
                        "isConfirmationPasswordMatched" ? (
                        <span className="help is-danger">
                          Password Confirmation not matched with password.
                          Please try again!
                        </span>
                      ) : (
                        <span className="help is-danger">
                          Password Confirmation must contains at least 7
                          characters
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="button is-block is-info is-large is-fullwidth"
                disabled={isSavingData}
              >
                {isSavingData ? (
                  <Spinner as="span" animation="border" />
                ) : (
                  "Register"
                )}
              </button>
            </form>
          </div>
          <p className="has-text-grey">
            <a>Sign In With Google</a>&nbsp;
            <a href="/login">Sign In</a> &nbsp;·&nbsp;
            <a href="../">Need Help?</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default notAuthenticatedBoundaryRoute(Register);
