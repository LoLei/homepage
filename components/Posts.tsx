import React from 'react';
import styles from '../styles/Posts.module.scss';
import Link from 'next/link';

const Posts = (props: IProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <div>
        <h1>Posts about things</h1>
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
  postListings: IPostMetaData[];
}

export interface IPostMetaData {
  name: string;
  sha: string;
  size: number;
}

export interface IPost {
  id: string;
  fileName: string;
  content: string;
}
