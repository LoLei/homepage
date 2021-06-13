import { GetServerSideProps } from 'next';
import React from 'react';
import Portfolio from '../../components/Portfolio';
import portFolioItems from '../../resources/portfolioItems.json';
import { IRepositoryMetadata } from '../../util/git/AbstractGitService';
import GithubService from '../../util/git/GithubService';

const PortfolioPage = (props: IProps): JSX.Element => {
  console.log(props);
  return <Portfolio />;
};

export default PortfolioPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const getPortFolioItemsViaGithub = async (specs: IPortFolioItemSpecification[]) => {
    const ps: Promise<IRepositoryMetadata | undefined>[] = specs.map((pfi) => {
      const githubService = new GithubService();
      return githubService.getRepository(pfi.owner, pfi.name);
    });

    const rps: IRepositoryMetadata[] = (await Promise.all(ps)).filter((it) => it) as IRepositoryMetadata[];
    return rps;
  };

  const personalPromise: Promise<IRepositoryMetadata[]> = getPortFolioItemsViaGithub(portFolioItems.personal);
  const openSourcePromise: Promise<IRepositoryMetadata[]> = getPortFolioItemsViaGithub(portFolioItems.openSource);
  const schoolPromise: Promise<IRepositoryMetadata[]> = getPortFolioItemsViaGithub(portFolioItems.school);

  const [portfolioDataPersonal, portfolioDataOpenSource, portfolioDataSchool] = await Promise.all([
    personalPromise,
    openSourcePromise,
    schoolPromise,
  ]);

  return {
    props: { portfolioDataPersonal, portfolioDataOpenSource, portfolioDataSchool },
  };
};

interface IProps {
  portfolioDataPersonal: IRepositoryMetadata[];
  portfolioDataOpenSource: IRepositoryMetadata[];
  portfolioDataSchool: IRepositoryMetadata[];
}

interface IPortFolioItemSpecification {
  name: string;
  owner: string;
  url: string;
}
