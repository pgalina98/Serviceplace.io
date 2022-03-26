import { addDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";

import database from "../../realtime-database/index";

import { usersCollection } from "../../firestore-database/collections";

import { ref, onValue } from "firebase/database";

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

export const getUserByUid = async (userUid) => {
  const queryGetUserByUid = query(usersCollection, where("uid", "==", userUid));

  return await getDocs(queryGetUserByUid);
};

export const getUserById = async (userId) => {
  const userRef = createUserRef(userId);

  return await getUserByRef(userRef);
};

export const getUserByRef = async (userRef) => {
  return await getDoc(userRef);
};

export const onConnectionStateChange = (callback) => {
  const connectedRef = ref(database, ".info/connected");

  onValue(connectedRef, (snapshot) => {
    callback(snapshot.val());
  });
};

export const createUserRef = (userId) => {
  try {
    return doc(usersCollection, userId);
  } catch (error) {
    return Promise.reject(error);
  }
};
