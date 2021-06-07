import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from '../styles/About.module.scss';

const About = (): JSX.Element => {
  const markdown = `
# About Me  

Hi, I’m Lorenz. Here are some facts about me that might be of interest to you:

Hi, I’m Lorenz. Here are some facts about me that might be of interest to you: Hi, I’m Lorenz. Here are some facts about me that might be of interest to you:
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
`;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
};

export default About;
