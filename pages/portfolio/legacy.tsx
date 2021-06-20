import { GetServerSideProps } from 'next';
import React from 'react';
import LegacyPortfolio from '../../components/LegacyPortfolio';
import Cache from '../../util/cache/Cache';

const LegacyPortfolioPage = (props: ILegacyPortolfio): JSX.Element => {
  return <LegacyPortfolio portfolioReadme={props.portfolioReadme} />;
};

export default LegacyPortfolioPage;

export interface ILegacyPortolfio {
  portfolioReadme: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const database = Cache.Instance;

  if (await database.datastoreLegacyPortfolio.needsRepopulate()) {
    await database.datastoreLegacyPortfolio.populate();
  }

  const legacyPortfolio = await database.datastoreLegacyPortfolio.getAll();

  if (legacyPortfolio == null) {
    return {
      notFound: true,
    };
  }

  return {
    props: legacyPortfolio,
  };
};
