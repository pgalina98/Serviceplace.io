import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const registerUser = async (user) => {
  const { email, password, fullName, avatar } = user;

  try {
    const response = await createUserWithEmailAndPassword(
      getAuth(),
      email,
      password
    );
    const { user } = response;

    return true;
  } catch (error) {
    return Promise.reject(error.message);
  }
};
