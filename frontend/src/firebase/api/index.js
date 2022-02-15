import { getDocs } from "firebase/firestore";

import { servicesCollection } from "../firestore/collections";

export const fetchServices = () => {
  return getDocs(servicesCollection);
};
