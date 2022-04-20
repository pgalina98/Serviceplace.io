import {
  addDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { createUserRef } from "./users-controller";

import { notificationsCollection } from "../../firestore-database/collections";
import { createCollaborationRef } from "./collaborations-controller";

export const fetchNotificationByCollaborationIdAndNotificationType = async (
  collaborationId,
  notificationType
) => {
  const collaborationRef = createCollaborationRef(collaborationId);

  const queryGetNotificationByCollaborationIdAndNotificationType = query(
    notificationsCollection,
    where("collaborationRef", "==", collaborationRef),
    where("type", "==", notificationType)
  );

  return await getDocs(
    queryGetNotificationByCollaborationIdAndNotificationType
  );
};

export const saveNotification = async (data) => {
  try {
    await addDoc(notificationsCollection, {
      ...data,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateNotification = async (data) => {
  const notificationRef = await createNotificationRef(data.id);

  const updatedDoc = {
    invitationAccepted: data.invitationAccepted,
    isRemoved: true,
  };

  if (!!data.invitationAccepted === false) {
    delete Object.assign(updatedDoc)["invitationAccepted"];
  }

  try {
    return await updateDoc(notificationRef, updatedDoc);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createNotificationRef = (notificationId) => {
  try {
    return doc(notificationsCollection, notificationId);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const subscribe = (userId, callback) => {
  const userRef = createUserRef(userId);

  const queryGetNotificationsByUserId = query(
    notificationsCollection,
    where("toUserRef", "==", userRef),
    where("isRemoved", "==", false)
  );

  onSnapshot(queryGetNotificationsByUserId, (response) => {
    const notifications = response.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));

    callback(notifications);
  });
};
