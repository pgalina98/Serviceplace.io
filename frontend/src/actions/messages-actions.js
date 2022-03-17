import { serverTimestamp } from "firebase/firestore";

import { MESSAGE_TYPES } from "utils/message-type-constants";

import { createCollaborationRef } from "../firebase/api/controllers/collaborations-controller";
import { createUserRef } from "../firebase/api/controllers/users-controller";

import * as api from "../firebase/api/controllers/messages-controller";

export const createCollaborationInvitationMessage = (data) => ({
  collaborationRef: createCollaborationRef(data.collaborationId),
  type: MESSAGE_TYPES.INVITATION,
  text: `Hello ${data.toUser.fullname}, please join this collaboration! :)`,
  createdAt: serverTimestamp(),
  fromUserRef: createUserRef(data.fromUser.id),
  toUserRef: createUserRef(data.toUser.id),
});

export const sendMessage = (message) => {
  return api.saveMessage(message);
};

export const acceptCollaborationInvitation = (notification) => {
  return api.updateMessage(notification);
};

export const subscribe = (userId, callback) => {
  api.subscribe(userId, (messages) => callback(messages));
};
