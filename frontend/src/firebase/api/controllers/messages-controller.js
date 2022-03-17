import {
  addDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { createUserRef } from "./users-controller";

import { messagesCollection } from "../../firestore/collections";

export const saveMessage = async (data) => {
  try {
    await addDoc(messagesCollection, {
      ...data,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateMessage = async (data) => {
  const messageRef = await createMessageRef(data.id);

  try {
    return await updateDoc(messageRef, {
      invitationAccepted: data.invitationAccepted,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const subscribe = (userId, callback) => {
  const userRef = createUserRef(userId);

  const queryGetMessagesByUserId = query(
    messagesCollection,
    where("toUserRef", "==", userRef)
  );

  onSnapshot(queryGetMessagesByUserId, (response) => {
    const messages = response.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));

    callback(messages);
  });
};

export const createMessageRef = (messageId) => {
  try {
    return doc(messagesCollection, messageId);
  } catch (error) {
    return Promise.reject(error);
  }
};
