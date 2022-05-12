import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { app } from "../../firestore-database/index";

import { createNewUser } from "./users-controller";

export const registerUser = async (user) => {
  const { email, password } = user;

  try {
    const response = await createUserWithEmailAndPassword(
      getAuth(app),
      email,
      password
    );
    const newUser = {
      uid: response.user.uid,
      fullname: user.fullname,
      email: user.email,
      avatar: user.avatar,
    };

    createNewUser(newUser);

    return newUser;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const authenticateUser = (user) => {
  const { email, password } = user;

  try {
    return signInWithEmailAndPassword(getAuth(app), email, password);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const logoutUser = () => {
  return signOut(getAuth(app));
};

export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(getAuth(app), callback);
};
