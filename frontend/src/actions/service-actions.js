import { getDoc } from "firebase/firestore";
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
  return api.fetchServiceById(id).then(async (response) => {
    const userRef = response.data()["userRef"];
    const user = await getDoc(userRef);

    const service = { id: response.id, ...response.data() };

    delete Object.assign(service, {
      createdBy: { id: user.id, ...user.data() },
    })["userRef"];

    return { type: SUCCESS(ACTION_TYPES.GET_SERVICE_DATA), payload: service };
  });
};

export const saveService = async (service, userId) => {
  return await api.saveService(service, userId);
};

export const getLoggedUserServices = async (userId) => {
  return await api.fetchLoggedUserServices(userId).then((response) => {
    const userServices = response.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));

    return userServices;
  });
};
