export const COLLABORATION_TAB_REQUESTS = "REQUESTS";
export const COLLABORATION_TAB_ACTIVE = "ACTIVE";

export const COLLABORATION_TABS = {
  REQUESTS: 1,
  ACTIVE: 2,
};

export const mapIdToStatus = (statusId) => {
  switch (statusId) {
    case COLLABORATION_TABS.REQUESTS:
      return COLLABORATION_TAB_REQUESTS;
    case COLLABORATION_TABS.ACTIVE:
      return COLLABORATION_TAB_ACTIVE;

    default:
      return null;
  }
};
