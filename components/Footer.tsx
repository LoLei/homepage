import React from 'react';
import styles from '../styles/Footer.module.scss';

const Footer = (): JSX.Element => {
  return (
    <footer className={styles.style}>
      <a href="https://github.com/LoLei/homepage" title="Source">
        Made with ❤ by me
      </a>
    </footer>
  );
};

export default Footer;
