import React from 'react';
import styles from '../styles/Posts.module.scss';
import mockPosts from '../resources/mock-posts.json';
import Link from 'next/link';

const Posts = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Posts about various things</h1>
      </div>

      <div className={styles.postList}>
        {(mockPosts as IPost[]).map((post, idx) => {
          return (
            <div key={idx}>
              <Link href={`/posts/${post.id}`}>
                <a>
                  {post.id}: {post.fileName}
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

export interface IPost {
  id: number;
  fileName: string;
  content: string;
}
