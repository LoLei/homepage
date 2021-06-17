import Link from 'next/link';
import React from 'react';
import { IPortfolioSection } from '../pages/portfolio';
import styles from '../styles/Portfolio.module.scss';
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
          intro={props.portfolioSectionPersonal.intro}
          portfolioData={props.portfolioSectionPersonal.portfolioDataItems}
        />
        <PortfolioItemsSection
          className={styles.portFolioItemsOpenSource}
          title="Open-Source Projects"
          intro={props.portfolioSectionOpenSource.intro}
          portfolioData={props.portfolioSectionOpenSource.portfolioDataItems}
        />
        <PortfolioItemsSection
          className={styles.portFolioItemsSchool}
          title="School Projects"
          intro={props.portfolioSectionSchool.intro}
          portfolioData={props.portfolioSectionSchool.portfolioDataItems}
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
  portfolioSectionPersonal: IPortfolioSection;
  portfolioSectionOpenSource: IPortfolioSection;
  portfolioSectionSchool: IPortfolioSection;
}
