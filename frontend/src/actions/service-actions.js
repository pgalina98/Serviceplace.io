import { getDocs } from "firebase/firestore";

import { SUCCESS } from "utils/action-type-util";
import { servicesCollection } from "../firebase/firestore/collections";

export const ACTION_TYPES = {
  GET_SERVICES_DATA: "servicesState/GET_SERVICES_DATA",
};

export const getServices = () => {
  const snapshot = getDocs(servicesCollection);

  return snapshot.then((response) => {
    const services = response.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));
    return { type: SUCCESS(ACTION_TYPES.GET_SERVICES_DATA), payload: services };
  });
};
