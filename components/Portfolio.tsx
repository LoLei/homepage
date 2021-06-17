import Link from 'next/link';
import React from 'react';
import styles from '../styles/Portfolio.module.scss';
import { IRepositoryMetadata } from '../util/git/AbstractGitService';
import PortfolioItemsSection from './PortfolioItemsSection';

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
        <PortfolioItemsSection
          className={styles.portFolioItemsPersonal}
          title="Personal Projects"
          intro="These are some projects either developed due to a personal use case or just for the fun of it. Some of them are used by not an inconsiderable number of other people, as I've chosen to make them free and open source."
          portfolioData={props.portfolioDataPersonal}
        />
        <PortfolioItemsSection
          className={styles.portFolioItemsOpenSource}
          title="Open-Source Projects"
          intro="These projects are started and developed either by me with other people, or I have contributed to already existing codebases, i.e. they are more of a community-effort than pure personal ambition."
          portfolioData={props.portfolioDataOpenSource}
        />
        <PortfolioItemsSection
          className={styles.portFolioItemsSchool}
          title="School Projects"
          intro="During my time at university (TU Graz), I've had the chance to create many practical programs. Some of the more individual ones are listed here."
          portfolioData={props.portfolioDataSchool}
        />
      </div>

      <h2>Legacy Portfolio</h2>
      <div>
        This contains many more (older/smaller) projects and open-source projects to which I&apos;ve
        contributed to a lesser amount:{' '}
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
