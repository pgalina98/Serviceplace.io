import * as api from "../firebase/api/controllers/users-controller";

export const onConnectionStateChange = (callback) => {
  return api.onConnectionStateChange(callback);
};
