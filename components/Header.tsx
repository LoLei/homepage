import React from 'react';
import HeaderSeparator from '../components/HeaderSeparator';
import styles from '../styles/Header.module.scss';
import HeaderLink from './HeaderLink';

const Header = (): JSX.Element => {
  return (
    <header>
      <HeaderLink routeName="/" displayName="Home" />
      <span className={styles.separator}>
        <HeaderSeparator />
      </span>
      <HeaderLink routeName="/about" displayName="About" />
      <span className={styles.separator}>
        <HeaderSeparator />
      </span>
      <HeaderLink routeName="/posts" displayName="Posts" />
    </header>
  );
};

export default Header;
