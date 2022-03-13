export const OFFER_STATUS_PENDING = "PENDING";
export const OFFER_STATUS_ACCEPTED = "ACCEPTED";
export const OFFER_STATUS_REJECTED = "REJECTED";

export const OFFER_STATUS = {
  PENDING: 1,
  ACCEPTED: 2,
  REJECTED: 3,
  COLLABORATION_REQUEST_CREATED: 4,
};

export const mapIdToStatus = (statusId) => {
  switch (statusId) {
    case OFFER_STATUS.PENDING:
      return OFFER_STATUS_PENDING;
    case OFFER_STATUS.ACCEPTED:
      return OFFER_STATUS_ACCEPTED;
    case OFFER_STATUS.REJECTED:
      return OFFER_STATUS_REJECTED;
    case OFFER_STATUS.COLLABORATION_REQUEST_CREATED:
      return OFFER_STATUS_ACCEPTED;

    default:
      return null;
  }
};
