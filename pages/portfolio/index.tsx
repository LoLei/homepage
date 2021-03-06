import { GetServerSideProps } from 'next';
import React from 'react';
import HeadComponent from '../../components/HeadComponent';
import Portfolio from '../../components/Portfolio';
import Cache from '../../util/cache/Cache';
import { IRepositoryMetadata } from '../../util/git/AbstractGitService';

const PortfolioPage = (props: IPortfolioSections): JSX.Element => {
  return (
    <>
      <HeadComponent title="Lorenz Leitner - Portfolio" />
      <Portfolio
        portfolioSectionPersonal={props.portfolioSectionPersonal}
        portfolioSectionOpenSource={props.portfolioSectionOpenSource}
        portfolioSectionSchool={props.portfolioSectionSchool}
      />
    </>
  );
};

export default PortfolioPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const database = Cache.Instance;

  const repopulateIfNecessary = async (): Promise<void> => {
    if (await database.datastorePortfolioList.needsRepopulate()) {
      await database.datastorePortfolioList.populate();
    }
  };

  const sections = await database.datastorePortfolioList.getAll();
  repopulateIfNecessary();

  if (sections == null) {
    return {
      notFound: true,
    };
  }

  // If all are undefined, return 404
  if (
    sections.portfolioSectionPersonal.portfolioDataItems == null &&
    sections.portfolioSectionOpenSource.portfolioDataItems == null &&
    sections.portfolioSectionSchool.portfolioDataItems == null
  ) {
    return {
      notFound: true,
    };
  }

  // If all lists are empty, return 404
  if (
    [
      sections.portfolioSectionPersonal.portfolioDataItems,
      sections.portfolioSectionOpenSource.portfolioDataItems,
      sections.portfolioSectionSchool.portfolioDataItems,
    ].reduce((acc, it) => it.length === 0 && acc, true)
  ) {
    return {
      notFound: true,
    };
  }

  return {
    props: sections,
  };
};

export interface IPortfolioSections {
  portfolioSectionPersonal: IPortfolioSection;
  portfolioSectionOpenSource: IPortfolioSection;
  portfolioSectionSchool: IPortfolioSection;
}

export interface IPortFolioItemSpecification {
  name: string;
  owner: string;
  url: string;
  description?: string;
  image: string;
}

export interface IPortfolioSection {
  portfolioDataItems: IRepositoryMetadata[];
  intro: string;
}
