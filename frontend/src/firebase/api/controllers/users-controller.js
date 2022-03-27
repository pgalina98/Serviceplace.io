import {
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import database from "../../realtime-database/index";

import { usersCollection } from "../../firestore-database/collections";

import {
  ref,
  onValue,
  push,
  onDisconnect,
  set,
  serverTimestamp,
} from "firebase/database";

import { v4 as uuid } from "uuid";
import {
  CONNECTION_STATUS,
  CONNECTION_STATUS_ONLINE,
} from "utils/connection-status-constants";

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

export const updateUserActivity = async (userId, isConnected) => {
  const userRef = await createUserRef(userId);

  const activityStatus = isConnected
    ? CONNECTION_STATUS.ONLINE
    : CONNECTION_STATUS.OFFLINE;

  return await updateDoc(userRef, { activityStatus });
};

export const onConnectionStateChange = (userId, callback) => {
  const loggedUserConnectionRef = ref(database, `users/${userId}/connections`);
  const lastConnectionRef = ref(database, `users/${userId}/lastConnection`);

  const connectedRef = ref(database, ".info/connected");

  onValue(connectedRef, (snapshot) => {
    if (snapshot.val() === true) {
      const connection = push(loggedUserConnectionRef);

      onDisconnect(connection).remove();

      set(connection, {
        id: uuid(),
        status: CONNECTION_STATUS_ONLINE,
      });

      onDisconnect(lastConnectionRef).set(serverTimestamp());
    }

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
