import { SUCCESS } from "utils/action-type-util";
import { fetchUserByUid } from "../firebase/api/controllers/users-controller";
import { logoutUser as logoutCurrentUser } from "../firebase/api/controllers/authentication-controller";

import * as api from "../firebase/api/controllers/authentication-controller";

export const ACTION_TYPES = {
  SET_AUTHENTICATION_STATE: "authenticationState/SET_AUTHENTICATION_STATE",
  CLEAR_AUTHENTICATION_STATE: "authenticationState/CLEAR_AUTHENTICATION_STATE",
  RESET_AUTHENTICATION_STATE: "authenticationState/RESET_AUTHENTICATION_STATE",
};

export const resetAuthenticationState = () => ({
  type: SUCCESS(ACTION_TYPES.RESET_AUTHENTICATION_STATE),
});

export const setAuthenticatedUser = (data) => {
  if (data?.uid) {
    return fetchUserByUid(data.uid).then((response) => {
      const user = response.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));

      return {
        type: SUCCESS(ACTION_TYPES.SET_AUTHENTICATION_STATE),
        payload: Object.assign({}, ...user),
      };
    });
  }

  return {
    type: SUCCESS(ACTION_TYPES.CLEAR_AUTHENTICATION_STATE),
  };
};

export const logoutUser = (userId) => {
  return logoutCurrentUser(userId).then(() => {
    return {
      type: SUCCESS(ACTION_TYPES.CLEAR_AUTHENTICATION_STATE),
    };
  });
};

export const onAuthStateChange = (callback) => {
  return api.onAuthStateChange(callback);
};
