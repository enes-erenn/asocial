import { useEffect, useState } from "react";

interface Alert {
  isShowing: Boolean;
  message: String;
  status: String;
}

export const useAlert = () => {
  const [alert, setAlert] = useState<Alert>({
    isShowing: false,
    message: "",
    status: "",
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert({ isShowing: false, message: "", status: "" });
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [alert.isShowing]);

  const showAlert = (message: string, status: string) => {
    setAlert({
      isShowing: true,
      message,
      status,
    });
  };

  return { message: alert.message, status: alert.status, showAlert };
};
