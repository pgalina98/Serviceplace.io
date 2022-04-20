import {
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
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
    });
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
