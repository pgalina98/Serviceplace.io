import { getDocs } from "firebase/firestore";

import { servicesCollection } from "../../firestore/collections";

export const fetchServices = async () => {
  return await getDocs(servicesCollection);
};
