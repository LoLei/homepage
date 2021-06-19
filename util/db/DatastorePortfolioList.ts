import AsyncNedb from 'nedb-async';
import { IPortFolioItemSpecification, IPortfolioSections } from '../../pages/portfolio';
import TimeDelta from '../date/delta';
import { IRepositoryMetadata } from '../git/AbstractGitService';
import GitDelegator from '../git/GitDelegator';
import AbstractDatastore from './AbstractDatastore';
import portFolioItemsInput from '../../resources/portfolioItems.json';

class DatastorePortfolioList extends AbstractDatastore<IPortfolioSections> {
  private lastUpdatedDate: Date;
  private datastore: AsyncNedb<IPortfolioSections>;

  public constructor() {
    super();
    this.lastUpdatedDate = new Date();
    this.datastore = new AsyncNedb<IPortfolioSections>();
  }

  public async needsRepopulate(): Promise<boolean> {
    const age = TimeDelta.absoluteTimeDifferenceInHours(this.lastUpdatedDate, new Date());
    if ((await this.getCount()) === 0 || age >= 1) {
      return true;
    }
    console.log(`Portfolio list needs repopulate in ${1 - age}h`);
    return false;
  }

  public async populate(): Promise<IPortfolioSections> {
    console.log('Populating portfolio list…');
    // Empty datastore before
    await this.datastore.asyncRemove({}, { multi: true });

    // Populate from Github
    const getPortFolioItemsViaGit = async (
      specs: IPortFolioItemSpecification[],
      gitService: GitDelegator
    ) => {
      const ps: Promise<IRepositoryMetadata | undefined>[] = specs.map((pfi) => {
        return gitService.getRepository(pfi.url);
      });

      const rps: IRepositoryMetadata[] = (await Promise.allSettled(ps))
        .filter(({ status }) => status === 'fulfilled')
        .filter(
          (it) => (it as PromiseFulfilledResult<IRepositoryMetadata | undefined>).value != null
        )
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

    const [portfolioDataPersonal, portfolioDataOpenSource, portfolioDataSchool] = await Promise.all(
      [personalPromise, openSourcePromise, schoolPromise]
    );

    // If the API call fails, do not repopulate the database and return the old entries
    if (
      portfolioDataPersonal == null ||
      portfolioDataOpenSource == null ||
      portfolioDataSchool == null
    ) {
      console.warn('Git API call failed, skipping db repopulation, returning old results');
      return this.getAll();
    }

    // If any is empty TODO: Invert condition from all to any
    if (
      [portfolioDataPersonal, portfolioDataOpenSource, portfolioDataSchool].reduce(
        (acc, it) => it.length === 0 && acc,
        true
      )
    ) {
      console.warn('Git API call failed, skipping db repopulation, returning old results');
      return this.getAll();
    }

    const sections = {
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
    };

    const insertPromise = this.datastore.asyncInsert(sections);
    this.lastUpdatedDate = new Date();
    return insertPromise;
  }

  private async getCount(): Promise<number> {
    return (await this.datastore.asyncFind({})).length;
  }

  public getAll(): Promise<IPortfolioSections> {
    return this.datastore.asyncFindOne({});
  }
}

export default DatastorePortfolioList;
