import {
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

import { ref, onValue } from "firebase/database";

import database from "../../realtime-database/index";

import { COLLABORATION_STATUS } from "constants/collaboration-status-constants";

import { createOfferRef, changeOfferStatus } from "./offers-controller";
import { createUserRef } from "./users-controller";

import { collaborationsCollection } from "../../firestore-database/collections";

export const saveCollaboration = async (data) => {
  try {
    const collaboration = {
      offerRef: createOfferRef(data.id),
      collaborators: [
        { userRef: createUserRef(data.fromUser.id), joined: true },
        { userRef: createUserRef(data.toUser.id), joined: false },
      ],
      createdAt: serverTimestamp(),
      status: COLLABORATION_STATUS.PENDING,
      messages: [],
    };

    changeOfferStatus(data);

    const newCollaborationRef = createNewCollaborationRef();

    await setDoc(newCollaborationRef, collaboration);

    return newCollaborationRef.id;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchJoinedLoggedUserCollaborations = async (userId) => {
  const userRef = await createUserRef(userId);

  const queryGetCollaborationsByUserRef = query(
    collaborationsCollection,
    where("collaborators", "array-contains-any", [
      { joined: false, userRef },
      { joined: true, userRef },
    ])
  );

  return await getDocs(queryGetCollaborationsByUserRef);
};

export const fetchCollaborationById = async (collaborationId) => {
  const collaborationRef = createCollaborationRef(collaborationId);

  return await fetchCollaborationByRef(collaborationRef);
};

export const fetchCollaborationByRef = async (collaborationRef) => {
  return await getDoc(collaborationRef);
};

export const updateCollaboration = async (updatedDoc) => {
  const collaborationRef = createCollaborationRef(updatedDoc.id);

  try {
    return await updateDoc(collaborationRef, updatedDoc);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const saveMessage = async (collaborationId, message) => {
  const collaborationRef = createCollaborationRef(collaborationId);
  const document = await getDoc(collaborationRef);

  const updatedDoc = {
    id: document.id,
    ...document.data(),
    messages: [...document.data()["messages"], message],
  };

  try {
    return await updateDoc(collaborationRef, updatedDoc);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const onCollaborationMessagesChange = (collaborationId, callback) => {
  const collaborationRef = ref(
    database,
    `collaborations/${collaborationId}/messages`
  );

  onValue(collaborationRef, (snapshot) => {
    callback(snapshot.val());
  });
};

export const subscribe = async (userId, callback) => {
  const userRef = await createUserRef(userId);

  const queryGetCollaborationsByUserId = query(
    collaborationsCollection,
    where("collaborators", "array-contains-any", [
      { joined: false, userRef },
      { joined: true, userRef },
    ])
  );

  onSnapshot(queryGetCollaborationsByUserId, (response) => {
    const collaborations = response.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));

    callback(collaborations);
  });
};

export const createNewCollaborationRef = () => {
  try {
    return doc(collaborationsCollection);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createCollaborationRef = (collaborationId) => {
  try {
    return doc(collaborationsCollection, collaborationId);
  } catch (error) {
    return Promise.reject(error);
  }
};
