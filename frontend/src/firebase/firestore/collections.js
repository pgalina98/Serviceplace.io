import firestore from "./index";
import { collection } from "firebase/firestore";

export const servicesCollection = collection(firestore, "services");
export const usersCollection = collection(firestore, "users");
