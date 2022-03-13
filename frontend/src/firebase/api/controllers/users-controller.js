import { addDoc, doc, getDocs, query, where } from "firebase/firestore";

import { usersCollection } from "../../firestore/collections";

export const createNewUser = async (data) => {
  try {
    await addDoc(usersCollection, {
      ...data,
      services: [],
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUserByUid = async (userId) => {
  const queryGetUserByUid = query(usersCollection, where("uid", "==", userId));

  return await getDocs(queryGetUserByUid);
};

export const createUserRef = (userId) => {
  try {
    return doc(usersCollection, userId);
  } catch (error) {
    return Promise.reject(error);
  }
};
