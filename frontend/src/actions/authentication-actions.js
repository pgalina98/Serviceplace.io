import { SUCCESS } from "utils/action-type-util";
import * as api from "../firebase/api/controllers/authentication-controller";

export const ACTION_TYPES = {
  GET_USER_DATA: "authenticationState/GET_USER_DATA",
};

export const authenticateUser = (data) => {
  return api.loginUser(data);
};
