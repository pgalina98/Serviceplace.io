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
  return api.fetchServiceById(id).then(async (document) => {
    const userRef = document.data()["userRef"];
    const user = await getDoc(userRef);

    const service = { id: document.id, ...document.data() };

    const offers = await Promise.all(
      document.data()["offers"].map(async (offerRef) => {
        const offerDocument = await getDoc(offerRef);
        const fromUserDocument = await getDoc(
          offerDocument.data()["fromUserRef"]
        );

        const offer = {
          id: offerDocument.id,
          ...offerDocument.data(),
        };

        delete Object.assign(offer, {
          fromUser: {
            id: fromUserDocument.id,
            ...fromUserDocument.data(),
          },
        })["fromUserRef"];

        return offer;
      })
    );

    delete Object.assign(service, {
      createdBy: { id: user.id, ...user.data() },
      offers,
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

export const deleteServiceById = async (serviceId) => {
  return await api.deleteServiceById(serviceId);
};
