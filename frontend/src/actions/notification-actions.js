import { serverTimestamp } from "firebase/firestore";

import { NOTIFICATION_TYPES } from "constants/notification-type-constants";

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
  isRemoved: false,
});

export const createNewOfferReceivedNotification = (offer) => ({
  type: NOTIFICATION_TYPES.STANDARD,
  text: `New offer for ${offer.service.title} received! :)`,
  createdAt: serverTimestamp(),
  fromUserRef: createUserRef(offer.fromUser.id),
  toUserRef: createUserRef(offer.toUser.id),
  isRemoved: false,
});

export const createOfferAcceptedNotification = (offer) => ({
  type: NOTIFICATION_TYPES.STANDARD,
  text: `${offer.toUser.fullname} accepted your offer for ${offer.service.title}! :)`,
  createdAt: serverTimestamp(),
  fromUserRef: createUserRef(offer.toUser.id),
  toUserRef: createUserRef(offer.fromUser.id),
  isRemoved: false,
});

export const getNotificationByCollaborationIdAndNotificationType = (
  colaborationId,
  notificationType
) => {
  return api
    .fetchNotificationByCollaborationIdAndNotificationType(
      colaborationId,
      notificationType
    )
    .then((response) => {
      const notifications = response.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));

      return notifications[0];
    });
};

export const saveNotification = (notification) => {
  return api.saveNotification(notification);
};

export const saveNotifications = (notifications) => {
  return api.saveNotifications(notifications);
};

export const removeNotification = (notification) => {
  return api.updateNotification(notification);
};

export const acceptCollaborationInvitation = (notification) => {
  return api.updateNotification(notification);
};

export const subscribe = (userId, callback) => {
  api.subscribe(userId, (notifications) => callback(notifications));
};
