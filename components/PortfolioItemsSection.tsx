import React from 'react';
import { IRepositoryMetadata } from '../util/git/AbstractGitService';
import PortfolioItem from './PortfolioItem';
import styles from '../styles/PortfolioItemsSection.module.scss';

const PortfolioItemsSection = (props: IProps): JSX.Element => {
  return (
    <>
      <div className={props.className}>
        <div className={styles.titleContainer}>
          <span className={styles.icon}>{props.icon} </span>
          <h3 className={styles.title}>{props.title}</h3>
        </div>
        {props.intro}
        {props.portfolioData.map((it, idx) => {
          return <PortfolioItem key={idx} data={it}></PortfolioItem>;
        })}
      </div>
    </>
  );
};

export default PortfolioItemsSection;

interface IProps {
  portfolioData: IRepositoryMetadata[];
  icon: JSX.Element;
  title: string;
  intro: string;
  className: string;
}
