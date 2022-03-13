import firestore from "./index";
import { collection } from "firebase/firestore";

export const servicesCollection = collection(firestore, "services");
export const usersCollection = collection(firestore, "users");
export const offersCollection = collection(firestore, "offers");
export const collaborationsCollection = collection(firestore, "collaborations");
export const messagesCollection = collection(firestore, "messages");
