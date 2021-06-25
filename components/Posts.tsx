import React from 'react';
import styles from '../styles/Posts.module.scss';
import Link from 'next/link';
import { IRepositoryContentEntryMetadata } from '../util/git/AbstractGitService';

const Posts = (props: IProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <div>
        <h1>Posts About Things</h1>
        <p>
          (These posts are sourced from <a href="https://github.com/LoLei/posts">Github</a>.)
        </p>
      </div>

      <div>
        {props.postListings.map((pl, idx) => {
          return (
            <div key={idx}>
              {props.postListings.length - idx}
              {': '}
              <Link href={`/posts/${pl.name}`}>
                <a>{pl.name}</a>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Posts;

interface IProps {
  postListings: IRepositoryContentEntryMetadata[];
}
