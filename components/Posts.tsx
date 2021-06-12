import React from 'react';
import styles from '../styles/Posts.module.scss';
import Link from 'next/link';

const Posts = (props: IProps): JSX.Element => {
  console.log(props.postListings);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Posts about various things</h1>
      </div>

      <div className={styles.postList}>
        {props.postListings.map((pl, idx) => {
          return (
            <div key={idx}>
              <Link href={`/posts/${pl.name}`}>
                <a>
                  {pl.sha}: {pl.name}
                </a>
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
