import { getDocs } from "firebase/firestore";

import { SUCCESS } from "utils/action-type-util";
import { servicesCollection } from "../firebase/firestore/collections";

export const ACTION_TYPES = {
  GET_SERVICES_DATA: "servicesState/GET_SERVICES_DATA",
  GET_SERVICE_DATA: "servicesState/GET_SERVICE_DATA",
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

export const getServiceById = (id) => {
  const snapshot = getDocs(servicesCollection);

  return snapshot.then((response) => {
    const service = response.docs
      .map((document) => ({
        id: document.id,
        ...document.data(),
      }))
      .find((document) => document.id === id);

    return { type: SUCCESS(ACTION_TYPES.GET_SERVICE_DATA), payload: service };
  });
};
