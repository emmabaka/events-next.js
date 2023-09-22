import { useContext } from "react";
import NotificationContext from "@/store/notification-context";
import Notification from "@/components/ui/Notification/Notification";
import Header from "../Header/Header";

interface Props {
  children: React.ReactNode;
}
interface NotificationData {
  title: string;
  message: string;
  status: string;
}

const Layout = ({ children }: Props) => {
  const notificationCtx = useContext(NotificationContext);

  

  const activeNotification: NotificationData = notificationCtx.notification;
  return (
    <>
      <Header />
      <main>{children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </>
  );
};

export default Layout;
