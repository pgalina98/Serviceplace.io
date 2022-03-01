import { addDoc, getDocs, query, where } from "firebase/firestore";

import { servicesCollection } from "../../firestore/collections";

export const fetchServices = async () => {
  return await getDocs(servicesCollection);
};

export const fetchLoggedUserServices = async (userId) => {
  const queryGetServicesByUserId = query(
    servicesCollection,
    where("uid", "==", userId)
  );

  return await getDocs(queryGetServicesByUserId);
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
