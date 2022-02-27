import { addDoc, getDocs } from "firebase/firestore";

import { servicesCollection } from "../../firestore/collections";

export const fetchServices = async () => {
  return await getDocs(servicesCollection);
};

export const saveService = async (data) => {
  try {
    await addDoc(servicesCollection, {
      ...data,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
