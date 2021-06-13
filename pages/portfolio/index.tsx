import { GetServerSideProps } from 'next';
import React from 'react';
import Portfolio from '../../components/Portfolio';
import portFolioItems from '../../resources/portfolioItems.json';

const PortfolioPage = (props: IProps): JSX.Element => {
  console.log(props);
  return <Portfolio />;
};

export default PortfolioPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const getRepoDataForPortfolioItem = async (owner: string, repoName: string): Promise<IPortFolioItem | undefined> => {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repoName}`, {
      headers: new Headers({
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.mercy-preview+json', // mercy-preview needed for topics
      }),
    });
    if (!res.ok) {
      console.error(res.status, res.statusText);
      return undefined;
    }
    const { name, stargazers_count, language, topics, description } = await res.json();
    return { name, stargazersCount: stargazers_count, language, topics, description };
  };

  const getPortFolioItemsViaGithub = async (specs: IPortFolioItemSpecification[]) => {
    const ps: Promise<IPortFolioItem | undefined>[] = specs.map((pfi) => {
      return getRepoDataForPortfolioItem(pfi.owner, pfi.name);
    });

    const rps: IPortFolioItem[] = (await Promise.all(ps)).filter((it) => it) as IPortFolioItem[];
    return rps;
  };

  const personalPromise: Promise<IPortFolioItem[]> = getPortFolioItemsViaGithub(portFolioItems.personal);
  const openSourcePromise: Promise<IPortFolioItem[]> = getPortFolioItemsViaGithub(portFolioItems.openSource);
  const schoolPromise: Promise<IPortFolioItem[]> = getPortFolioItemsViaGithub(portFolioItems.school);

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
  portfolioDataPersonal: IPortFolioItem[];
  portfolioDataOpenSource: IPortFolioItem[];
  portfolioDataSchool: IPortFolioItem[];
}

interface IPortFolioItem {
  name: string;
  stargazersCount: number;
  language: string;
  topics: string[];
  description: string;
}

interface IPortFolioItemSpecification {
  name: string;
  owner: string;
  url: string;
}
