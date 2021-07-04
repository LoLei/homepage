import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/NotFound.module.scss';
import HeadComponent from '../components/HeadComponent';

const NotFound = (): JSX.Element => {
  const router = useRouter();

  return (
    <>
      <HeadComponent title="Lorenz Leitner - 404" />
      <div className={styles.container}>
        <h1>404 - Content Not Found</h1>

        <div>
          <span onClick={() => router.back()}>
            <a>Back</a>
          </span>
        </div>
        <div>
          <Link href="/">
            <a>Home</a>
          </Link>
        </div>

        <h4>All content is also available here:</h4>
        <div>
          <a href="https://github.com/LoLei/posts" target="_blank" rel="noreferrer">
            Posts
          </a>
        </div>
        <div>
          <a href="https://github.com/LoLei/portfolio" target="_blank" rel="noreferrer">
            Portfolio
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
