import toast from "react-hot-toast";

export const urlContainsHashId = () => {
  const id = +window.location.hash.slice(1);
  return Boolean(id);
};

export const handleError = (error: unknown) => {
  let message = "An error occurred.";

  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  }

  toast.error(message);
};
