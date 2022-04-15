import {
  addDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
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

import { CONNECTION_STATUS_ONLINE } from "constants/connection-status-constants";

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

export const fetchUserByUid = async (userUid) => {
  const queryGetUserByUid = query(usersCollection, where("uid", "==", userUid));

  return await getDocs(queryGetUserByUid);
};

export const fetchUserById = async (userId) => {
  const userRef = createUserRef(userId);

  return await fetchUserByRef(userRef);
};

export const fetchUserByRef = async (userRef) => {
  return await getDoc(userRef);
};

export const onConnectionStateChange = (userId) => {
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
  });
};

export const onUsersConnectionsStateChange = (callback) => {
  const usersConnectionsRef = ref(database, `users/`);

  onValue(usersConnectionsRef, (snapshot) => {
    const keys = snapshot.val();
    let users = [];

    for (let key in keys) {
      if (snapshot.val()[key]?.connections) {
        users.push(key);
      }
    }

    callback(users);
  });
};

export const setCollaboratorIsTypingStatus = async (
  collaborationId,
  userId,
  status
) => {
  const loggedUserCollaborationRef = ref(
    database,
    `users/${userId}/collaborations/${collaborationId}/isTyping`
  );

  set(loggedUserCollaborationRef, status);

  onDisconnect(loggedUserCollaborationRef).remove();
};

export const onCollaboratorIsTypingStatusChange = (
  collaborationId,
  userId,
  callback
) => {
  const loggedUserCollaborationRef = ref(
    database,
    `users/${userId}/collaborations/${collaborationId}/isTyping`
  );

  onValue(loggedUserCollaborationRef, (snapshot) => {
    callback(snapshot.val());
  });
};

export const subscribe = (callback) => {
  onSnapshot(usersCollection, (response) => {
    const users = response.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));

    callback(users);
  });
};

export const createUserRef = (userId) => {
  try {
    return doc(usersCollection, userId);
  } catch (error) {
    return Promise.reject(error);
  }
};
