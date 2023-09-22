import { useContext } from "react";
import NotificationContext from "@/store/notification-context";
import s from "./Notification.module.scss";

function Notification({
  title,
  message,
  status,
}: {
  title: string;
  message: string;
  status: string;
}) {
  const notificationCtx = useContext(NotificationContext);

  let statusClasses = "";

  if (status === "success") statusClasses = s.success;

  if (status === "error") statusClasses = s.error;

  if (status === "pending") statusClasses = s.pending;

  const activeClasses = `${s.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={notificationCtx.hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
