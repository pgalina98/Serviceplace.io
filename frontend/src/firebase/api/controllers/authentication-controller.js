import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { createNewUser } from "./users-controller";

export const registerUser = async (user) => {
  const { email, password } = user;

  try {
    const response = await createUserWithEmailAndPassword(
      getAuth(),
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

export const authenticateUser = async (user) => {
  const { email, password } = user;

  try {
    return signInWithEmailAndPassword(getAuth(), email, password);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(getAuth(), callback);
};
