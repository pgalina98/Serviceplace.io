import {
  addDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { createUserRef } from "./users-controller";

import { notificationsCollection } from "../../firestore/collections";

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

  try {
    return await updateDoc(notificationRef, {
      invitationAccepted: data.invitationAccepted,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const subscribe = (userId, callback) => {
  const userRef = createUserRef(userId);

  const queryGetNotificationsByUserId = query(
    notificationsCollection,
    where("toUserRef", "==", userRef)
  );

  onSnapshot(queryGetNotificationsByUserId, (response) => {
    const notifications = response.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));

    callback(notifications);
  });
};

export const createNotificationRef = (notificationId) => {
  try {
    return doc(notificationsCollection, notificationId);
  } catch (error) {
    return Promise.reject(error);
  }
};
