import * as api from "../firebase/api/controllers/users-controller";

export const onConnectionStateChange = (userId) => {
  return api.onConnectionStateChange(userId, (isConnected) => {
    api.updateUserActivity(userId, isConnected);
  });
};

export const setCollaboratorIsTypingStatus = (
  collaborationId,
  userId,
  status
) => {
  return api.setCollaboratorIsTypingStatus(collaborationId, userId, status);
};

export const subscribe = (callback) => {
  api.subscribe((users) => callback(users));
};
