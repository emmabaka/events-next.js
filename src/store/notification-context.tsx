import { createContext, useState, useEffect } from "react";

interface Props {
  children: React.ReactNode;
}
interface NotificationData {
  title: string;
  message: string;
  status: string;
}

const NotificationContext = createContext({
  notification: {
    title: "",
    message: "",
    status: "",
  },
  showNotification: function (notificationData: NotificationData) {},
  hideNotification: function () {},
});

export function NotificationContextProvider({ children }: Props) {
  const [activeNotification, setActiveNotification] =
    useState<NotificationData>({ title: "", message: "", status: "" });

  useEffect(() => {
    if (
      activeNotification!.status !== "" &&
      (activeNotification!.status === "success" ||
        activeNotification!.status === "error")
    ) {
      const timer = setTimeout(() => {
        setActiveNotification({
          title: "",
          message: "",
          status: "",
        });
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  function showNotificationHandler(notificationData: NotificationData) {
    setActiveNotification(notificationData);
  }

  function hideNotificationHandler() {
    setActiveNotification({
      title: "",
      message: "",
      status: "",
    });
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
