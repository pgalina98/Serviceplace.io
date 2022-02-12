import { doc, getDocs } from "firebase/firestore";

import { SUCCESS } from "utils/action-type-util";
import { servicesCollection } from "../firebase/firestore/collections";

export const ACTION_TYPES = {
  GET_SERVICES_DATA: "servicesState/GET_SERVICES_DATA",
};

export const fetchServices = () => {
  const services = [];

  const snapshot = getDocs(servicesCollection);
  snapshot.then((response) => {
    response.forEach((document) => {
      services.push({ id: document.id, name: document.data().name });
    });
  });

  return services;
};

export const getServices = () => {
  return {
    type: SUCCESS(ACTION_TYPES.GET_SERVICES_DATA),
    payload: fetchServices(),
  };
};
