import { SUCCESS } from "utils/action-type-util";
import * as api from "../firebase/api/controllers/users-controller";

export const ACTION_TYPES = {
  SET_USER_DATA: "authenticationState/SET_USER_DATA",
};

export const setAuthenticatedUser = (data) => {
  return api.getUserById(data.uid).then((response) => {
    const user = response.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));

    return {
      type: SUCCESS(ACTION_TYPES.SET_USER_DATA),
      payload: Object.assign({}, ...user),
    };
  });
};
