import { GetServerSideProps } from 'next';
import React from 'react';
import LegacyPortfolio from '../../components/LegacyPortfolio';
import GitDelegator from '../../util/git/GitDelegator';

const LegacyPortfolioPage = (props: IProps): JSX.Element => {
  return <LegacyPortfolio portfolioReadme={props.portfolioReadme} />;
};

export default LegacyPortfolioPage;

interface IProps {
  portfolioReadme: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const gitService = GitDelegator.Instance;
  const portfolioReadme = (
    await gitService.getRepositoryFileContent('https://github.com/LoLei/portfolio/README.md')
  )?.content;

  if (portfolioReadme == null) {
    return {
      notFound: true,
    };
  }

  return {
    props: { portfolioReadme },
  };
};
