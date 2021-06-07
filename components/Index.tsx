import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Obfuscate from 'react-obfuscate';
import styles from '../styles/Index.module.scss';

const Index = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Lorenz Leitner</h1>
      </div>

      <div className={styles.subtitle}>
        <h2>
          <i>Welcome to my homepage</i>
        </h2>
      </div>

      <div className={styles.siteInformation}>
        <p>This is where you&apos;ll find:</p>
        <ul>
          <li>Contact information</li>
          <li>Links to all my other online presences</li>
          <li>More information about me</li>
          <li>My portfolio</li>
          <li>Blog posts</li>
        </ul>
      </div>

      <div className={styles.contact}>
        Email:{' '}
        <Obfuscate
          email="lrnz.ltnr@gmail.com"
          headers={{
            subject: 'Contact from Homepage',
          }}
        />
      </div>
    </div>
  );
};

export default Index;
