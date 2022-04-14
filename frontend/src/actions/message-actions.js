import { ref, onDisconnect, set, serverTimestamp } from "firebase/database";

import database from "../firebase/realtime-database/index";

import * as api from "../firebase/api/controllers/messages-controller";

export const sendNewMessage = (collaboratioId, message) => {
  const newMessage = {
    ...message,
    createdAt: serverTimestamp(),
  };

  const collaborationRef = ref(
    database,
    `collaborations/${collaboratioId}/messages`
  );

  set(collaborationRef, newMessage);

  onDisconnect(collaborationRef).remove();

  api.sendMessage(collaboratioId, newMessage);
};
