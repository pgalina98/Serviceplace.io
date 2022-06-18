import {
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { servicesCollection } from "../../firestore-database/collections";

import { createUserRef } from "./users-controller";

export const fetchServices = async () => {
  return await getDocs(servicesCollection);
};

export const fetchServiceById = async (serviceId) => {
  const serviceRef = createServiceRef(serviceId);

  return await getDoc(serviceRef);
};

export const fetchLoggedUserServices = async (userId) => {
  const userRef = await createUserRef(userId);

  const queryGetServicesByUserRef = query(
    servicesCollection,
    where("userRef", "==", userRef)
  );

  return await getDocs(queryGetServicesByUserRef);
};

export const saveService = async (data, userId) => {
  try {
    data.userRef = createUserRef(userId);

    await addDoc(servicesCollection, {
      ...data,
      offers: [],
      likes: [],
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateServiceWithNewOffer = async (serviceId, offer) => {
  const serviceRef = createServiceRef(serviceId);
  const document = await getDoc(serviceRef);

  const updatedDoc = {
    id: document.id,
    ...document.data(),
    offers: [...document.data()["offers"], offer],
  };

  try {
    return await updateDoc(serviceRef, updatedDoc);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateService = async (serviceId, updatedDoc) => {
  const serviceRef = createServiceRef(serviceId);

  try {
    return await updateDoc(serviceRef, updatedDoc);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteServiceById = async (serviceId) => {
  try {
    const serviceRef = await createServiceRef(serviceId);

    await deleteDoc(serviceRef);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createServiceRef = (serviceId) => {
  try {
    return doc(servicesCollection, serviceId);
  } catch (error) {
    return Promise.reject(error);
  }
};
