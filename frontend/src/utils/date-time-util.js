import moment from "moment";

export const formatDate = (seconds, format) =>
  moment.utc(seconds * 1000).format(format);
