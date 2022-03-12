import firestore from "./index";
import { collection } from "firebase/firestore";

export const servicesCollection = collection(firestore, "services");
export const usersCollection = collection(firestore, "users");
export const offersCollection = collection(firestore, "offers");
export const collaborationCollection = collection(firestore, "collaboration");
