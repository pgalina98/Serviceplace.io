import { addDoc } from "firebase/firestore";

import { offersCollection } from "../../firestore/collections";

import * as api from "./users-controller";

export const saveOffer = async (data) => {
  try {
    data.fromUser = api.createUserRef(data.fromUser);
    data.toUser = api.createUserRef(data.toUser);

    await addDoc(offersCollection, {
      ...data,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
