import React from 'react';
import styles from '../styles/Posts.module.scss';
import mockPosts from '../resources/mock-posts.json';

const Index = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Posts about various things</h1>
      </div>

      <div className={styles.postList}>
        {(mockPosts as Post[]).map((post, idx) => {
          return (
            <div key={idx}>
              {post.id}: {post.fileName}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Index;

interface Post {
  id: number;
  fileName: string;
  content: string;
}
