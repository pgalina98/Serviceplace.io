import { getDoc } from "firebase/firestore";

import { SUCCESS } from "utils/action-type-util";

import * as api from "../firebase/api/controllers/services-controller";

export const ACTION_TYPES = {
  GET_SERVICES_STATE: "servicesState/GET_SERVICES_STATE",
  GET_SERVICE_STATE: "servicesState/GET_SERVICE_STATE",
};

export const getServices = () => {
  return api.fetchServices().then((response) => {
    const services = response.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));

    return {
      type: SUCCESS(ACTION_TYPES.GET_SERVICES_STATE),
      payload: services,
    };
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

    return { type: SUCCESS(ACTION_TYPES.GET_SERVICE_STATE), payload: service };
  });
};

export const saveService = (service, userId) => {
  return api.saveService(service, userId);
};

export const getLoggedUserServices = (userId) => {
  return api.fetchLoggedUserServices(userId).then((response) => {
    const userServices = response.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));

    return userServices;
  });
};

export const deleteServiceById = (serviceId) => {
  return api.deleteServiceById(serviceId);
};
