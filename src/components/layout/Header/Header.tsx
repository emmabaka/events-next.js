import Link from "next/link";
import s from "./Header.module.scss";

const Header = () => {
  return (
    <header className={s.header}>
      <div>
        <Link className={s.logo} href="/">
          NextEvents
        </Link>
      </div>
      <nav className={s.navigation}>
        <ul>
          <li>
            <Link href="/events">Browse All Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
