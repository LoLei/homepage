import Link from "next/link";
import HeaderSeparator from "../components/HeaderSeparator";
import styles from "../styles/Header.module.scss";

const Header = (): JSX.Element => {
  return (
    <header>
      <Link href="/">
        <a>Home</a>
      </Link>
      <span className={styles.separator}>
        <HeaderSeparator />
      </span>
      <Link href="/about">
        <a>About</a>
      </Link>
    </header>
  );
};

export default Header;
