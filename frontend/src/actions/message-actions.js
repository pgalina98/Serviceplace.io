import { ref, onDisconnect, set, onValue } from "firebase/database";

import database from "../firebase/realtime-database/index";

import dayjs from "dayjs";

import { APP_DATE_WITH_DAY_AND_MONTH_TIME_FORMAT } from "config/date-time-formats";

import * as api from "../firebase/api/controllers/messages-controller";

export const sendNewMessage = (collaboratioId, message) => {
  const newMessage = {
    ...message,
    createdAt: dayjs().format(APP_DATE_WITH_DAY_AND_MONTH_TIME_FORMAT),
  };

  const collaborationRef = ref(
    database,
    `collaborations/${collaboratioId}/messages`
  );

  onValue(
    collaborationRef,
    (snapshot) => {
      if (snapshot.val()) {
        set(collaborationRef, [...snapshot.val(), newMessage]);
      } else {
        set(collaborationRef, [newMessage]);
      }
    },
    {
      onlyOnce: true,
    }
  );

  onDisconnect(collaborationRef).remove();

  api.sendMessage(collaboratioId, newMessage);
};
