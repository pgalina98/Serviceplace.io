import { serverTimestamp } from "firebase/firestore";

import { NOTIFICATION_TYPES } from "utils/notification-type-constants";

import { createCollaborationRef } from "../firebase/api/controllers/collaborations-controller";
import { createUserRef } from "../firebase/api/controllers/users-controller";

import * as api from "../firebase/api/controllers/notifications-controller";

export const createCollaborationInvitatioNotification = (data) => ({
  collaborationRef: createCollaborationRef(data.collaborationId),
  type: NOTIFICATION_TYPES.COLLABORATION_INVITATION,
  text: `Hello ${data.toUser.fullname}, please join this collaboration! :)`,
  createdAt: serverTimestamp(),
  fromUserRef: createUserRef(data.fromUser.id),
  toUserRef: createUserRef(data.toUser.id),
});

export const saveNotification = (notification) => {
  return api.saveNotification(notification);
};

export const acceptCollaborationInvitation = (notification) => {
  return api.updateNotification(notification);
};

export const subscribe = (userId, callback) => {
  api.subscribe(userId, (messages) => callback(messages));
};
