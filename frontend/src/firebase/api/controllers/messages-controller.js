import { doc, serverTimestamp, setDoc } from "firebase/firestore";

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
      fromUserRef: await createUserRef(message.fromUser),
      toUserRef: await createUserRef(message.toUser),
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
