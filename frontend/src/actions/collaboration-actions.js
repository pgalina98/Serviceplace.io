import { serverTimestamp } from "firebase/firestore";

import { MESSAGE_TYPES } from "utils/message-type-constants";

import { createOfferRef } from "../firebase/api/controllers/offers-controller";
import { createUserRef } from "../firebase/api/controllers/users-controller";

const createNewCollaboration = (offer) => ({
  offerRef: createOfferRef(offer.id),
  collaborators: [
    { userRef: createUserRef(offer.fromUser.id), joined: false },
    { userRef: createUserRef(offer.toUserRef.id), joined: false },
  ],
  createdAt: serverTimestamp(),
});

const createNewMessage = (offer) => ({
  offerRef: createOfferRef(offer.id),
  type: MESSAGE_TYPES.INVITATION,
  text: `Hello ${offer.toUser.fullname}, please join this collaboration! :)`,
  createdAt: serverTimestamp(),
});
