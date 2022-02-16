const VALID_EXTENSIONS = ["png", "jpeg", "jpg", "svg"];

export const isValidImage = (imageUrl) => {
  if (!imageUrl) {
    return true;
  }

  if (typeof imageUrl !== "string") {
    return false;
  }

  const extenstion = imageUrl.split(".").pop();

  return VALID_EXTENSIONS.includes(extenstion);
};

export const isConfirmationPasswordMatched =
  (getValues) => (confirmationPassword) => {
    if (!confirmationPassword) {
      return true;
    }

    if (typeof confirmationPassword !== "string") {
      return false;
    }

    const password = getValues("password");

    return confirmationPassword === password;
  };
