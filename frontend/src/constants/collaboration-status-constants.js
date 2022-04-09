export const COLLABORATION_STATUS_PENDING = "PENDING";
export const COLLABORATION_STATUS_JOINED = "JOINED";

export const COLLABORATION_STATUS = {
  PENDING: 1,
  JOINED: 2,
};

export const mapIdToStatus = (statusId) => {
  switch (statusId) {
    case COLLABORATION_STATUS.PENDING:
      return COLLABORATION_STATUS_PENDING;
    case COLLABORATION_STATUS.JOINED:
      return COLLABORATION_STATUS_JOINED;

    default:
      return null;
  }
};
