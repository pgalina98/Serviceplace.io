import { ref, onDisconnect, set } from "firebase/database";

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

  set(collaborationRef, newMessage);

  onDisconnect(collaborationRef).remove();

  api.sendMessage(collaboratioId, newMessage);
};
