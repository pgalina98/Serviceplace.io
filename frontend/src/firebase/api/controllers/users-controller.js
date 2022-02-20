import { addDoc, getDocs, query, where } from "firebase/firestore";

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

export const getUserById = async (userId) => {
  const queryGetUserById = query(usersCollection, where("uid", "==", userId));

  return await getDocs(queryGetUserById);
};
