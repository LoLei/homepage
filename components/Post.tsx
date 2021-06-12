import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from '../styles/Post.module.scss';
import { IPost } from './Posts';

const Posts = (props: IProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ReactMarkdown>{props.postData.content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Posts;

export interface IProps {
  postData: IPost;
}
