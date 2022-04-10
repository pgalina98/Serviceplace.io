import { serverTimestamp } from "firebase/firestore";

import * as api from "../firebase/api/controllers/messages-controller";

export const sendNewMessage = (collaboratioId, message) => {
  const newMessage = {
    ...message,
    createdAt: serverTimestamp(),
  };

  api.sendMessage(collaboratioId, newMessage);
};
