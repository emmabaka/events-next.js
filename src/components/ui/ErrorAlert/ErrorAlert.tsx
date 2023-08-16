import s from "./ErrorAlert.module.scss";

interface Props {
  children: React.ReactNode;
}

function ErrorAlert({ children }: Props) {
  return <div className={s.alert}>{children}</div>;
}

export default ErrorAlert;
