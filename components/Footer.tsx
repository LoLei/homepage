import React from 'react';
import styles from '../styles/Footer.module.scss';
import HeaderSeparator from './HeaderSeparator';

const Footer = (): JSX.Element => {
  return (
    <footer className={styles.style}>
      <span>
        <a href="https://github.com/LoLei/homepage" title="Source">
          Made with ❤ by me
        </a>
      </span>
      <HeaderSeparator />
      <span>
        <a href="https://k8s-dashboard.lolei.dev" title="Cluster status">
          Status
        </a>
      </span>
    </footer>
  );
};

export default Footer;
