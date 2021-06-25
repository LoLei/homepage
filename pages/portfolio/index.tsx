import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';
import Portfolio from '../../components/Portfolio';
import Cache from '../../util/cache/Cache';
import { IRepositoryMetadata } from '../../util/git/AbstractGitService';

const PortfolioPage = (props: IPortfolioSections): JSX.Element => {
  return (
    <>
      <Head>
        <title>Lorenz Leitner - Portfolio</title>
      </Head>
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

  if (await database.datastorePortfolioList.needsRepopulate()) {
    await database.datastorePortfolioList.populate();
  }

  const sections = await database.datastorePortfolioList.getAll();

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
