export const CONNECTION_STATUS_ONLINE = "ONLINE";
export const CONNECTION_STATUS_OFFLINE = "OFFLINE";

export const CONNECTION_STATUS = {
  OFFLINE: 0,
  ONLINE: 1,
};

export const mapIdToStatus = (statusId) => {
  switch (statusId) {
    case CONNECTION_STATUS.ONLINE:
      return CONNECTION_STATUS_ONLINE;
    case CONNECTION_STATUS.OFFLINE:
      return CONNECTION_STATUS_OFFLINE;

    default:
      return null;
  }
};
