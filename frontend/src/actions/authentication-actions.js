import { SUCCESS } from "utils/action-type-util";
import * as apiUsers from "../firebase/api/controllers/users-controller";
import * as apiAuthentication from "../firebase/api/controllers/authentication-controller";

export const ACTION_TYPES = {
  SET_USER_DATA: "authenticationState/SET_USER_DATA",
  CLEAR_USER_DATA: "authenticationState/CLEAR_USER_DATA",
};

export const setAuthenticatedUser = (data) => {
  if (data?.uid) {
    return apiUsers.getUserById(data.uid).then((response) => {
      const user = response.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));

      return {
        type: SUCCESS(ACTION_TYPES.SET_USER_DATA),
        payload: Object.assign({}, ...user),
      };
    });
  }

  return {
    type: SUCCESS(ACTION_TYPES.CLEAR_USER_DATA),
  };
};

export const logoutUser = () => {
  return apiAuthentication.logoutUser().then(() => {
    return {
      type: SUCCESS(ACTION_TYPES.CLEAR_USER_DATA),
    };
  });
};
