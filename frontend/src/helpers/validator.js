const VALID_EXTENSIONS = ["png", "jpeg", "jpg", "svg"];

export const isValidImage = (value) => {
  if (!value) {
    return true;
  }

  if (typeof value !== "string") {
    return false;
  }

  const extenstion = value.split(".").pop();

  return VALID_EXTENSIONS.includes(extenstion);
};
