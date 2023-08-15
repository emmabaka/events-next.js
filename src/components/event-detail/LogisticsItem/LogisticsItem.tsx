import s from "./LogisticsItem.module.scss";

interface Props {
  children: React.ReactNode;
  icon: any;
}

function LogisticsItem({ children, icon: Icon }: Props) {
  return (
    <li className={s.item}>
      <span className={s.icon}>
        <Icon />
      </span>
      <span className={s.content}>{children}</span>
    </li>
  );
}

export default LogisticsItem;
