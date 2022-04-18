import {
  addDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { offersCollection } from "../../firestore-database/collections";

import { createUserRef } from "./users-controller";
import { createServiceRef } from "./services-controller";

export const saveOffer = async (data) => {
  try {
    data.fromUser = createUserRef(data.fromUser);
    data.toUser = createUserRef(data.toUser);
    data.service = createServiceRef(data.service);
    data.createdAt = serverTimestamp();

    delete Object.assign(data, {
      fromUserRef: data.fromUser,
    })["fromUser"];

    delete Object.assign(data, {
      toUserRef: data.toUser,
    })["toUser"];

    delete Object.assign(data, {
      serviceRef: data.service,
    })["service"];

    await addDoc(offersCollection, {
      ...data,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchCreatedOffers = async (userId) => {
  const userRef = await createUserRef(userId);
  const queryGetOffersByFromUser = query(
    offersCollection,
    where("fromUserRef", "==", userRef)
  );

  return await getDocs(queryGetOffersByFromUser);
};

export const fetchReceivedOffers = async (userId) => {
  const userRef = await createUserRef(userId);
  const queryGetOffersByToUser = query(
    offersCollection,
    where("toUserRef", "==", userRef)
  );

  return await getDocs(queryGetOffersByToUser);
};

export const changeOfferStatus = async (data) => {
  const offerRef = await createOfferRef(data.id);

  try {
    return await updateDoc(offerRef, { status: data.status });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createOfferRef = (offerId) => {
  try {
    return doc(offersCollection, offerId);
  } catch (error) {
    return Promise.reject(error);
  }
};
