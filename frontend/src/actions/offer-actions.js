import * as api from "../firebase/api/controllers/offers-controller";

export const saveOffer = async (offer) => {
  return await api.saveOffer(offer);
};
