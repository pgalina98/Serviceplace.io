import { addDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";

import { servicesCollection } from "../../firestore/collections";

import * as api from "./users-controller";

export const fetchServices = async () => {
  return await getDocs(servicesCollection);
};

export const fetchServiceById = async (serviceId) => {
  const serviceRef = doc(servicesCollection, serviceId);

  return await getDoc(serviceRef);
};

export const fetchLoggedUserServices = async (userId) => {
  const userRef = await api.createUserRef(userId);
  const queryGetServicesByUserRef = query(
    servicesCollection,
    where("userRef", "==", userRef)
  );

  return await getDocs(queryGetServicesByUserRef);
};

export const saveService = async (data, userId) => {
  try {
    data.userRef = api.createUserRef(userId);
    await addDoc(servicesCollection, {
      ...data,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
