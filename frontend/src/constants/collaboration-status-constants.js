export const COLLABORATION_STATUS_PENDING = "PENDING";
export const COLLABORATION_STATUS_IN_PROGRESS = "IN_PROGRESS";
export const COLLABORATION_STATUS_IS_FINISHED = "FINISHED";

export const COLLABORATION_STATUS = {
  PENDING: 1,
  IN_PROGRESS: 2,
  FINISHED: 3,
};

export const mapIdToStatus = (statusId) => {
  switch (statusId) {
    case COLLABORATION_STATUS.PENDING:
      return COLLABORATION_STATUS_PENDING;
    case COLLABORATION_STATUS.IN_PROGRESS:
      return COLLABORATION_STATUS_IN_PROGRESS;
    case COLLABORATION_STATUS.FINISHED:
      return COLLABORATION_STATUS_IS_FINISHED;

    default:
      return null;
  }
};

export const mapStatusToId = (status) => {
  switch (status) {
    case COLLABORATION_STATUS_PENDING:
      return COLLABORATION_STATUS.PENDING;
    case COLLABORATION_STATUS_IN_PROGRESS:
      return COLLABORATION_STATUS.IN_PROGRESS;
    case COLLABORATION_STATUS_IS_FINISHED:
      return COLLABORATION_STATUS.FINISHED;

    default:
      return null;
  }
};
