import { addDoc } from "firebase/firestore";

import { offersCollection } from "../../firestore/collections";

import { createUserRef } from "./users-controller";
import { createServiceRef } from "./services-controller";

export const saveOffer = async (data) => {
  try {
    data.fromUser = createUserRef(data.fromUser);
    data.toUser = createUserRef(data.toUser);
    data.service = createServiceRef(data.service);
    await addDoc(offersCollection, {
      ...data,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
