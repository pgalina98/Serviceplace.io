import { addDoc } from "firebase/firestore";

import { offersCollection } from "../../firestore/collections";

import * as apiUsers from "./users-controller";
import * as apiServices from "./services-controller";

export const saveOffer = async (data) => {
  try {
    data.fromUser = apiUsers.createUserRef(data.fromUser);
    data.toUser = apiUsers.createUserRef(data.toUser);
    data.service = apiServices.createServiceRef(data.service);
    await addDoc(offersCollection, {
      ...data,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
