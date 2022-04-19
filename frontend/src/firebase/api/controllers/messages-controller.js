import {
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";

import {
  createCollaborationRef,
  saveMessage,
} from "./collaborations-controller";
import { createUserRef } from "./users-controller";

import { messagesCollection } from "../../firestore-database/collections";

export const sendMessage = async (collaborationId, message) => {
  try {
    const newMessage = {
      collaborationRef: await createCollaborationRef(collaborationId),
      fromUserRef: await createUserRef(message.fromUser.id),
      toUserRef: await createUserRef(message.toUser.id),
      text: message.text,
      createdAt: serverTimestamp(),
    };

    const newMessageRef = createNewMessageRef();

    await setDoc(newMessageRef, newMessage);

    saveMessage(collaborationId, newMessageRef);
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

export const createNewMessageRef = () => {
  try {
    return doc(messagesCollection);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createMessageRef = (messageId) => {
  try {
    return doc(messagesCollection, messageId);
  } catch (error) {
    return Promise.reject(error);
  }
};
