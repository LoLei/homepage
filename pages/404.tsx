import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/NotFound.module.scss';

const NotFound = (): JSX.Element => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1>404 - Page Not Found</h1>
      <div>
        <div>
          <span onClick={() => router.back()}>
            <a>Back</a>
          </span>
        </div>
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
