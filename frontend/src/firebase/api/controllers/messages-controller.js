import { addDoc, getDoc, onSnapshot, query, where } from "firebase/firestore";

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

  const unsubscribe = onSnapshot(queryGetMessagesByUserId, async (response) => {
    const messages = await Promise.all(
      response.docs.map(async (document) => {
        const fromUserRef = document.data()["fromUserRef"];
        const toUserRef = document.data()["toUserRef"];
        const collaborationRef = document.data()["collaborationRef"];

        const fromUser = await getDoc(fromUserRef);
        const toUser = await getDoc(toUserRef);
        const collaboration = await getDoc(collaborationRef);

        const offerRef = collaboration.data()["offerRef"];

        const offer = await getDoc(offerRef);

        const serviceRef = offer.data()["serviceRef"];

        const service = await getDoc(serviceRef);

        const message = { id: document.id, ...document.data() };

        delete Object.assign(message, {
          fromUser: { id: fromUser.id, ...fromUser.data() },
        })["fromUserRef"];

        delete Object.assign(message, {
          toUser: { id: toUser.id, ...toUser.data() },
        })["toUserRef"];

        delete Object.assign(message, {
          collaboration: {
            id: collaboration.id,
            ...collaboration.data(),
            offer: {
              id: offer.id,
              ...offer.data(),
              service: { id: service.id, ...service.data() },
            },
          },
        })["collaborationRef"];

        return message;
      })
    );

    callback(messages, unsubscribe);
  });
};
