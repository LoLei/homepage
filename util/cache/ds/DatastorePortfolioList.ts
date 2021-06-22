import { IPortFolioItemSpecification, IPortfolioSections } from '../../../pages/portfolio';
import TimeDelta from '../../date/delta';
import { IRepositoryMetadata } from '../../git/AbstractGitService';
import GitDelegator from '../../git/GitDelegator';
import portFolioItemsInput from '../../../resources/portfolioItems.json';
import AbstractDatastore from './AbstractDatastore';
import IDatabase from '../db/IDatabase';
import createDatabase, { DatabaseType } from '../db/DatabaseFactory';

class DatastorePortfolioList extends AbstractDatastore<IPortfolioSections> {
  private lastUpdatedDate: Date;
  protected db: IDatabase<IPortfolioSections>;

  public constructor() {
    super();
    this.lastUpdatedDate = new Date();
    this.db = createDatabase<IPortfolioSections>(DatabaseType.IN_MEMORY_NE);
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
    await this.db.remove({}, { multi: true });

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

    // If any is empty
    if (
      [portfolioDataPersonal, portfolioDataOpenSource, portfolioDataSchool].reduce(
        (acc, it) => it.length === 0 || acc,
        false
      )
    ) {
      console.warn('Git API call failed, skipping db repopulation, returning old results');
      return this.getAll();
    }

    const setImage = (
      entry: IRepositoryMetadata,
      sectionType: 'personal' | 'school'
    ): IRepositoryMetadata => {
      // Finding the corresponding image for every entry like this isn't ideal,
      // a different data structure could be used instead, e.g. one that maps
      // from name to entry instead of this one that has a list of entries
      const image = portFolioItemsInput[sectionType].items.find(
        (it: IPortFolioItemSpecification) => it.name === entry.name
      )?.image;
      entry.image = image || 'no image provided';
      return entry;
    };

    const sections = {
      portfolioSectionPersonal: {
        portfolioDataItems: portfolioDataPersonal.map((it: IRepositoryMetadata) =>
          setImage(it, 'personal')
        ),
        intro: portFolioItemsInput.personal.intro,
      },
      portfolioSectionOpenSource: {
        // Some open-source projects may not have a description
        portfolioDataItems: portfolioDataOpenSource.map((i: IRepositoryMetadata) => {
          const inputItem = portFolioItemsInput.openSource.items.find((j) => j.name === i.name);
          if (i.description.length === 0) {
            const fallbackDescription = inputItem?.description;
            i.description = fallbackDescription!;
          }
          i.image = inputItem?.image || 'no image provided';
          return i;
        }),
        intro: portFolioItemsInput.openSource.intro,
      },
      portfolioSectionSchool: {
        portfolioDataItems: portfolioDataSchool.map((it: IRepositoryMetadata) =>
          setImage(it, 'school')
        ),
        intro: portFolioItemsInput.school.intro,
      },
    };

    const insertPromise = this.db.insert(sections);
    this.lastUpdatedDate = new Date();
    return insertPromise;
  }

  private async getCount(): Promise<number> {
    return (await this.db.find({})).length;
  }

  public getAll(): Promise<IPortfolioSections> {
    return this.db.findOne({});
  }
}

export default DatastorePortfolioList;
