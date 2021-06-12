import Link from 'next/link';
import React from 'react';
import styles from '../styles/Portfolio.module.scss';

const Portfolio = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div>
        <h1>Portfolio</h1>
      </div>

      <h2>Selected Projects</h2>
      <div>Some larger and more recent projects.</div>

      <h2>Legacy Portfolio</h2>
      <div>
        This contains more/older/smaller projects:
        {" "}
        <Link href="/portfolio/legacy">
          <a>Link</a>
        </Link>
      </div>
    </div>
  );
};

export default Portfolio;
