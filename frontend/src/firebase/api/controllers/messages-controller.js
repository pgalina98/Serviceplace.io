import { addDoc, onSnapshot, query, where } from "firebase/firestore";

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
