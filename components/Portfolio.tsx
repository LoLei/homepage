import Link from 'next/link';
import React from 'react';
import styles from '../styles/Portfolio.module.scss';
import { IRepositoryMetadata } from '../util/git/AbstractGitService';
import PortfolioItem from './PortfolioItem';

const Portfolio = (props: IProps): JSX.Element => {
  console.log(props);
  return (
    <div className={styles.container}>
      <div>
        <h1>Portfolio</h1>
      </div>

      <h2>Selected Projects</h2>
      <div>Some larger and more recent projects.</div>

      <div className={styles.portfolioItems}>
        <div className={styles.portFolioItemsPersonal}>
          <h3>Personal Projects</h3>
          {props.portfolioDataPersonal.map((it, idx) => {
            return <PortfolioItem key={idx} data={it}></PortfolioItem>;
          })}
        </div>
        <div className={styles.portFolioItemsOpenSource}>
          <h3>Open-Source Projects</h3>
          {props.portfolioDataOpenSource.map((it, idx) => {
            return <PortfolioItem key={idx} data={it}></PortfolioItem>;
          })}
        </div>
        <div className={styles.portFolioItemsSchool}>
          <h3>School Projects</h3>
          {props.portfolioDataSchool.map((it, idx) => {
            return <PortfolioItem key={idx} data={it}></PortfolioItem>;
          })}
        </div>
      </div>

      <h2>Legacy Portfolio</h2>
      <div>
        This contains more/older/smaller projects:{' '}
        <Link href="/portfolio/legacy">
          <a>Link</a>
        </Link>
      </div>
    </div>
  );
};

export default Portfolio;

interface IProps {
  portfolioDataPersonal: IRepositoryMetadata[];
  portfolioDataOpenSource: IRepositoryMetadata[];
  portfolioDataSchool: IRepositoryMetadata[];
}
