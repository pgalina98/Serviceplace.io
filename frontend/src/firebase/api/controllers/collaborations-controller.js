import {
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";

import { COLLABORATION_STATUS } from "utils/collaboration-status-constants";

import { createOfferRef, changeOfferStatus } from "./offers-controller";
import { createUserRef } from "./users-controller";

import { collaborationsCollection } from "../../firestore/collections";

export const saveCollaboration = async (data) => {
  try {
    const collaboration = {
      offerRef: createOfferRef(data.id),
      collaborators: [
        { userRef: createUserRef(data.fromUser.id), joined: false },
        { userRef: createUserRef(data.toUser.id), joined: false },
      ],
      createdAt: serverTimestamp(),
      status: COLLABORATION_STATUS.PENDING,
    };

    changeOfferStatus(data);

    const newCollaborationRef = createNewCollaborationRef();

    await setDoc(newCollaborationRef, collaboration);

    return newCollaborationRef.id;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchLoggedUserCollaborations = async (userId) => {
  const userRef = createUserRef(userId);
  const queryGetCollaborationsByUserRef = query(
    collaborationsCollection,
    where("collaborators", "array-contains-any", [
      { joined: false, userRef },
      { joined: true, userRef },
    ]),
    where("status", "==", COLLABORATION_STATUS.PENDING)
  );

  return await getDocs(queryGetCollaborationsByUserRef);
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
