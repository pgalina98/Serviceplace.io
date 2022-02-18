import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc } from "firebase/firestore";

import { usersCollection } from "../../firestore/collections";

const createUser = async (data) => {
  try {
    await addDoc(usersCollection, {
      ...data,
      services: [],
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const registerUser = async (user) => {
  const { email, password } = user;

  try {
    const response = await createUserWithEmailAndPassword(
      getAuth(),
      email,
      password
    );
    const newUser = { uid: response.user.uid, ...user };

    createUser(newUser);

    return newUser;
  } catch (error) {
    return Promise.reject(error);
  }
};
