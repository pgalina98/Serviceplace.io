import { getDoc } from "firebase/firestore";

import * as api from "../firebase/api/controllers/offers-controller";

export const saveOffer = async (offer) => {
  return await api.saveOffer(offer);
};

export const getCreatedOffers = (userId) => {
  return api.fetchCreatedOffers(userId).then((response) => {
    return response.docs.map(async (document) => {
      const fromUserRef = document.data()["fromUserRef"];
      const toUserRef = document.data()["toUserRef"];
      const serviceRef = document.data()["serviceRef"];

      const fromUser = await getDoc(fromUserRef);
      const toUser = await getDoc(toUserRef);
      const service = await getDoc(serviceRef);

      const offer = { id: document.id, ...document.data() };

      delete Object.assign(offer, {
        fromUser: { id: fromUser.id, ...fromUser.data() },
      })["fromUserRef"];

      delete Object.assign(offer, {
        toUser: { id: toUser.id, ...toUser.data() },
      })["toUserRef"];

      delete Object.assign(offer, {
        service: { id: service.id, ...service.data() },
      })["serviceRef"];

      return offer;
    });
  });
};

export const getReceivedOffers = (userId) => {
  return api.fetchReceivedOffers(userId).then((response) => {
    const offers = response.docs.map(async (document) => {
      const fromUserRef = document.data()["fromUserRef"];
      const toUserRef = document.data()["toUserRef"];
      const serviceRef = document.data()["serviceRef"];

      const fromUser = await getDoc(fromUserRef);
      const toUser = await getDoc(toUserRef);
      const service = await getDoc(serviceRef);

      const offer = { id: document.id, ...document.data() };

      delete Object.assign(offer, {
        fromUser: { id: fromUser.id, ...fromUser.data() },
      })["fromUserRef"];

      delete Object.assign(offer, {
        toUser: { id: toUser.id, ...toUser.data() },
      })["toUserRef"];

      delete Object.assign(offer, {
        service: { id: service.id, ...service.data() },
      })["serviceRef"];

      return offer;
    });

    return offers;
  });
};
