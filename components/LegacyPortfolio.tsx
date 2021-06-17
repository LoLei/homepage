import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from '../styles/LegacyPortfolio.module.scss';

const LegacyPortfolio = (props: IProps): JSX.Element => {
  console.log(props);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ReactMarkdown>{props.portfolioReadme}</ReactMarkdown>
      </div>
    </div>
  );
};

export default LegacyPortfolio;

interface IProps {
  portfolioReadme: string;
}
