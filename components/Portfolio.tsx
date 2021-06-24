import Link from 'next/link';
import React from 'react';
import { IPortfolioSection } from '../pages/portfolio';
import styles from '../styles/Portfolio.module.scss';
import PortfolioItemsSection from './PortfolioItemsSection';
import { MdPerson, MdPublic, MdSchool } from 'react-icons/md';

const Portfolio = (props: IProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <div>
        <h1>Portfolio</h1>
      </div>

      <h2>Selected Projects</h2>
      <div>Some projects of notability…</div>
      <p>
        (These entries are sourced from a JSON file containing links to GitHub and GitLab repos. The
        stats are retrieved from there.)
      </p>

      <div className={styles.portfolioItems}>
        <PortfolioItemsSection
          className={styles.portFolioItemsPersonal}
          icon={<MdPerson />}
          title="Personal Projects"
          intro={props.portfolioSectionPersonal.intro}
          portfolioData={props.portfolioSectionPersonal.portfolioDataItems}
        />
        <PortfolioItemsSection
          className={styles.portFolioItemsOpenSource}
          icon={<MdPublic />}
          title="Open-Source Projects"
          intro={props.portfolioSectionOpenSource.intro}
          portfolioData={props.portfolioSectionOpenSource.portfolioDataItems}
        />
        <PortfolioItemsSection
          className={styles.portFolioItemsSchool}
          icon={<MdSchool />}
          title="School Projects"
          intro={props.portfolioSectionSchool.intro}
          portfolioData={props.portfolioSectionSchool.portfolioDataItems}
        />
      </div>

      <h2>Legacy Portfolio</h2>
      <div className={styles.legacyPortfolio}>
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
