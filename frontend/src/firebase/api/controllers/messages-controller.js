import { addDoc } from "firebase/firestore";

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
