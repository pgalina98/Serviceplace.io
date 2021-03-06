import {
  ref,
  onDisconnect,
  set,
  serverTimestamp,
  onValue,
} from "firebase/database";

import database from "../firebase/realtime-database/index";

import * as api from "../firebase/api/controllers/messages-controller";

export const sendNewMessage = (collaboratioId, message) => {
  const newMessage = {
    ...message,
    createdAt: {
      milliseconds: serverTimestamp(),
    },
    isRead: false,
  };

  const collaborationRef = ref(
    database,
    `collaborations/${collaboratioId}/messages`
  );

  onValue(
    collaborationRef,
    (snapshot) => {
      const messages = snapshot.val() || [];

      messages.push(newMessage);

      set(collaborationRef, messages);
    },
    {
      onlyOnce: true,
    }
  );

  onDisconnect(collaborationRef).remove();

  api.sendMessage(collaboratioId, newMessage);
};

export const markUnreadMessagesAsRead = (colaboration, userId) => {
  api.updateMessageIsReadStatus(colaboration, userId);
};

export const subscribeToMessages = (userId, callback) => {
  api.subscribe(userId, (messages) => callback(messages));
};
