import { doc, serverTimestamp, setDoc } from "firebase/firestore";

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
    };

    changeOfferStatus(data);

    const newCollaborationRef = createNewCollaborationRef();

    await setDoc(newCollaborationRef, collaboration);

    return newCollaborationRef.id;
  } catch (error) {
    return Promise.reject(error);
  }
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
