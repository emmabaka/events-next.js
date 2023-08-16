import Link from "next/link";
import s from "./Button.module.scss";
import { FunctionExpression } from "typescript";

interface Props {
  children: React.ReactNode;
  link?: string;
  handleClick?: () => void;
}

const Button = ({ children, link, handleClick }: Props) => {
  if (link) {
    return (
      <Link className={s.btn} href={link}>
        {children}
      </Link>
    );
  }

  return <button onClick={handleClick}>{children}</button>;
};

export default Button;
