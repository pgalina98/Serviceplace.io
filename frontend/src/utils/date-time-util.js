import moment from "moment";

export const formatDate = (seconds, format) =>
  moment(seconds * 1000).format(format);
