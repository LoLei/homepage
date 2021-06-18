import { GetServerSideProps } from 'next';
import React from 'react';
import Portfolio from '../../components/Portfolio';
import portFolioItemsInput from '../../resources/portfolioItems.json';
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
  const getPortFolioItemsViaGit = async (
    specs: IPortFolioItemSpecification[],
    gitService: GitDelegator
  ) => {
    const ps: Promise<IRepositoryMetadata | undefined>[] = specs.map((pfi) => {
      return gitService.getRepository(pfi.url);
    });

    const rps: IRepositoryMetadata[] = (await Promise.allSettled(ps))
      .filter(({ status }) => status === 'fulfilled')
      .filter((it) => (it as PromiseFulfilledResult<IRepositoryMetadata | undefined>).value != null)
      .map((it) => (it as PromiseFulfilledResult<IRepositoryMetadata>).value);
    return rps;
  };

  const gitService = GitDelegator.Instance;
  const personalPromise: Promise<IRepositoryMetadata[]> = getPortFolioItemsViaGit(
    portFolioItemsInput.personal.items,
    gitService
  );
  const openSourcePromise: Promise<IRepositoryMetadata[]> = getPortFolioItemsViaGit(
    portFolioItemsInput.openSource.items,
    gitService
  );
  const schoolPromise: Promise<IRepositoryMetadata[]> = getPortFolioItemsViaGit(
    portFolioItemsInput.school.items,
    gitService
  );

  const [portfolioDataPersonal, portfolioDataOpenSource, portfolioDataSchool] = await Promise.all([
    personalPromise,
    openSourcePromise,
    schoolPromise,
  ]);

  if (
    [portfolioDataPersonal, portfolioDataOpenSource, portfolioDataSchool].reduce(
      (acc, it) => it.length === 0 && acc,
      true
    )
  ) {
    return {
      // If all lists are empty, return 404
      notFound: true,
    };
  }

  return {
    props: {
      portfolioSectionPersonal: {
        portfolioDataItems: portfolioDataPersonal,
        intro: portFolioItemsInput.personal.intro,
      },
      portfolioSectionOpenSource: {
        // Some open-source projects may not have a description
        portfolioDataItems: portfolioDataOpenSource.map((i: IRepositoryMetadata) => {
          if (i.description.length === 0) {
            const fallbackDescription = portFolioItemsInput.openSource.items.find(
              (j) => j.name === i.name
            )?.description;
            i.description = fallbackDescription!;
          }
          return i;
        }),
        intro: portFolioItemsInput.openSource.intro,
      },
      portfolioSectionSchool: {
        portfolioDataItems: portfolioDataSchool,
        intro: portFolioItemsInput.school.intro,
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
  description?: string;
}

export interface IPortfolioSection {
  portfolioDataItems: IRepositoryMetadata[];
  intro: string;
}
