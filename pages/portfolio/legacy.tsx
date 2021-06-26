import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';
import LegacyPortfolio from '../../components/LegacyPortfolio';
import Cache from '../../util/cache/Cache';

const LegacyPortfolioPage = (props: ILegacyPortolfio): JSX.Element => {
  return (
    <>
      <Head>
        <title>Lorenz Leitner - Legacy Portfolio</title>
      </Head>
      <LegacyPortfolio portfolioReadme={props.portfolioReadme} />
    </>
  );
};

export default LegacyPortfolioPage;

export interface ILegacyPortolfio {
  portfolioReadme: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const database = Cache.Instance;

  const repopulateIfNecessary = async (): Promise<void> => {
    if (await database.datastoreLegacyPortfolio.needsRepopulate()) {
      await database.datastoreLegacyPortfolio.populate();
    }
  };

  const legacyPortfolio = await database.datastoreLegacyPortfolio.getAll();
  repopulateIfNecessary();

  if (legacyPortfolio == null) {
    return {
      notFound: true,
    };
  }

  return {
    props: legacyPortfolio,
  };
};
