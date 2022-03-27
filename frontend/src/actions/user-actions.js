import * as api from "../firebase/api/controllers/users-controller";

export const onConnectionStateChange = (userId) => {
  return api.onConnectionStateChange(userId, (isConnected) => {
    api.updateUserActivity(userId, isConnected);
  });
};
