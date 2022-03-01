import { addDoc } from "firebase/firestore";

import { offersCollection } from "../../firestore/collections";

export const saveOffer = async (data) => {
  try {
    await addDoc(offersCollection, {
      ...data,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
