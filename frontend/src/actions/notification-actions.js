import { serverTimestamp } from "firebase/firestore";

import { NOTIFICATION_TYPES } from "utils/notification-type-constants";

import { createCollaborationRef } from "../firebase/api/controllers/collaborations-controller";
import { createUserRef } from "../firebase/api/controllers/users-controller";

import * as api from "../firebase/api/controllers/notifications-controller";

export const createCollaborationInvitatioNotification = (offer) => ({
  collaborationRef: createCollaborationRef(offer.collaborationId),
  type: NOTIFICATION_TYPES.COLLABORATION_INVITATION,
  text: `Hello ${offer.toUser.fullname}, please join this collaboration! :)`,
  createdAt: serverTimestamp(),
  fromUserRef: createUserRef(offer.fromUser.id),
  toUserRef: createUserRef(offer.toUser.id),
});

export const createOfferAcceptedNotification = (offer) => ({
  type: NOTIFICATION_TYPES.OFFER_ACCEPTED,
  text: `${offer.toUser.fullname} accepted your offer for ${offer.service.title}! :)`,
  createdAt: serverTimestamp(),
  fromUserRef: createUserRef(offer.toUser.id),
  toUserRef: createUserRef(offer.fromUser.id),
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
