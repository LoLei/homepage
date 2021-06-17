import { GetServerSideProps } from 'next';
import React from 'react';
import Portfolio from '../../components/Portfolio';
import portFolioItems from '../../resources/portfolioItems.json';
import { IRepositoryMetadata } from '../../util/git/AbstractGitService';
import GitDelegator from '../../util/git/GitDelegator';

const PortfolioPage = (props: IProps): JSX.Element => {
  return (
    <Portfolio
      portfolioSectionPersonal={props.portfolioSectionPersonal}
      portfolioSectionOpenSource={props.portfolioSectionOpenSource}
      portfolioSectionSchool={props.portfolioSectionSchool}
    />
  );
};

export default PortfolioPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const getPortFolioItemsViaGithub = async (
    specs: IPortFolioItemSpecification[],
    gitService: GitDelegator
  ) => {
    const ps: Promise<IRepositoryMetadata | undefined>[] = specs.map((pfi) => {
      return gitService.getRepository(pfi.url);
    });

    const rps: IRepositoryMetadata[] = (await Promise.all(ps)).filter(
      (it) => it
    ) as IRepositoryMetadata[];
    return rps;
  };

  const gitService = GitDelegator.Instance;
  const personalPromise: Promise<IRepositoryMetadata[]> = getPortFolioItemsViaGithub(
    portFolioItems.personal.items,
    gitService
  );
  const openSourcePromise: Promise<IRepositoryMetadata[]> = getPortFolioItemsViaGithub(
    portFolioItems.openSource.items,
    gitService
  );
  const schoolPromise: Promise<IRepositoryMetadata[]> = getPortFolioItemsViaGithub(
    portFolioItems.school.items,
    gitService
  );

  const [portfolioDataPersonal, portfolioDataOpenSource, portfolioDataSchool] = await Promise.all([
    personalPromise,
    openSourcePromise,
    schoolPromise,
  ]);

  return {
    props: {
      portfolioSectionPersonal: {
        portfolioDataItems: portfolioDataPersonal,
        intro: portFolioItems.personal.intro,
      },
      portfolioSectionOpenSource: {
        portfolioDataItems: portfolioDataOpenSource,
        intro: portFolioItems.openSource.intro,
      },
      portfolioSectionSchool: {
        portfolioDataItems: portfolioDataSchool,
        intro: portFolioItems.school.intro,
      },
    },
  };
};

interface IProps {
  portfolioSectionPersonal: IPortfolioSection;
  portfolioSectionOpenSource: IPortfolioSection;
  portfolioSectionSchool: IPortfolioSection;
}

interface IPortFolioItemSpecification {
  name: string;
  owner: string;
  url: string;
}

export interface IPortfolioSection {
  portfolioDataItems: IRepositoryMetadata[];
  intro: string;
}
