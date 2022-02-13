import { getDocs } from "firebase/firestore";

import { SUCCESS } from "utils/action-type-util";
import { servicesCollection } from "../firebase/firestore/collections";

export const ACTION_TYPES = {
  GET_SERVICES_DATA: "servicesState/GET_SERVICES_DATA",
};

export const fetchServices = async () => {
  const snapshot = await getDocs(servicesCollection);
  return snapshot.docs.map((document) => {
    return {
      id: document.id,
      ...document.data(),
    };
  });
};

export const getServices = () => {
  const snapshot = getDocs(servicesCollection);
  snapshot.then((document) => {
    return {
      type: SUCCESS(ACTION_TYPES.GET_SERVICES_DATA),
      payload: document.docs,
    };
  });
};
