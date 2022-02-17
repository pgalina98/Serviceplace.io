import { SUCCESS } from "utils/action-type-util";
import * as api from "../firebase/api/controllers/services-controller";

export const ACTION_TYPES = {
  GET_SERVICES_DATA: "servicesState/GET_SERVICES_DATA",
  GET_SERVICE_DATA: "servicesState/GET_SERVICE_DATA",
};

export const getServices = () => {
  return api.fetchServices().then((response) => {
    const services = response.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));

    return { type: SUCCESS(ACTION_TYPES.GET_SERVICES_DATA), payload: services };
  });
};

export const getServiceById = (id) => {
  return api.fetchServices().then((response) => {
    const service = response.docs
      .map((document) => ({
        id: document.id,
        ...document.data(),
      }))
      .find((document) => document.id === id);

    return { type: SUCCESS(ACTION_TYPES.GET_SERVICE_DATA), payload: service };
  });
};
