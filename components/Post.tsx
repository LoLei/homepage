import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from '../styles/Post.module.scss';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { funky } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import gfm from 'remark-gfm';
import { IRepositoryContentEntry } from '../util/git/AbstractGitService';

/*eslint-disable */
const components = {
  // @ts-ignore
  code({ node, inline, className, children, ...props }): JSX.Element {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter
        style={funky}
        language={match[1]}
        PreTag="div"
        children={String(children).replace(/\n$/, '')}
        {...props}
      />
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};
/*eslint-enable */

const Posts = (props: IProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ReactMarkdown
          plugins={[gfm]}
          // @ts-ignore
          // eslint-disable-next-line react/display-name
          components={components}
        >
          {props.postData.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Posts;

export interface IProps {
  postData: IRepositoryContentEntry;
}
