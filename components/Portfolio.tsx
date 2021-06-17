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

          These are some projects either developed due to a personal use case or just for the fun of it.
          Some of them are used by not an inconsiderable number of other people,
          as I've chosen to make them free and open source.

          {props.portfolioDataPersonal.map((it, idx) => {
            return <PortfolioItem key={idx} data={it}></PortfolioItem>;
          })}
        </div>
        <div className={styles.portFolioItemsOpenSource}>
          <h3>Open-Source Projects</h3>

          These projects are started and developed either by me with other people,
          or I have contributed to already existing codebases,
          i.e. they are more of a community-effort than pure personal ambition.

          {props.portfolioDataOpenSource.map((it, idx) => {
            return <PortfolioItem key={idx} data={it}></PortfolioItem>;
          })}
        </div>
        <div className={styles.portFolioItemsSchool}>
          <h3>School Projects</h3>
          During my time at university (TU Graz), I've had the chance to create
          many practical programs. Some of the more individual ones are listed here.

          {props.portfolioDataSchool.map((it, idx) => {
            return <PortfolioItem key={idx} data={it}></PortfolioItem>;
          })}
        </div>
      </div>

      <h2>Legacy Portfolio</h2>
      <div>
        This contains many more (older/smaller) projects and open-source projects
        to which I've contributed to a lesser amount:{' '}
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
