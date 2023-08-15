import Link from "next/link";
import s from "./Button.module.scss";

interface Props {
  children: React.ReactNode;
  link: string;
}

const Button = ({ children, link }: Props) => {
  return (
    <Link className={s.btn} href={link}>
      {children}
    </Link>
  );
};

export default Button;
