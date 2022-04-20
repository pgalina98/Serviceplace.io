export const COLLABORATION_TAB_REQUESTS = "REQUESTS";
export const COLLABORATION_TAB_JOINED = "JOINED";

export const COLLABORATION_TABS = {
  REQUESTS: 1,
  JOINED: 2,
};

export const mapIdToStatus = (statusId) => {
  switch (statusId) {
    case COLLABORATION_TABS.REQUESTS:
      return COLLABORATION_TAB_REQUESTS;
    case COLLABORATION_TABS.JOINED:
      return COLLABORATION_TAB_JOINED;

    default:
      return null;
  }
};
