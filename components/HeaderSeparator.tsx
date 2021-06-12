import React from 'react';
import styles from '../styles/Header.module.scss';

const HeaderSeparator = (): JSX.Element => {
  return <span className={styles.separator}>{' | '}</span>;
};

export default HeaderSeparator;
