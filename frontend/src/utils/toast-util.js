import { toast } from "react-toastify";

export const showToast = (toastType, message) => {
  switch (toastType) {
    case toast.info:
      toast.info(message);
      break;

    case toast.success:
      toast.success(message);
      break;

    case toast.warning:
      toast.warning(message);
      break;

    case toast.error:
      toast.error(message);
      break;

    default:
      toast(message);
  }
};
