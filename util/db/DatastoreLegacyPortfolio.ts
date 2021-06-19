import AsyncNedb from 'nedb-async';
import { ILegacyPortolfio } from '../../pages/portfolio/legacy';
import TimeDelta from '../date/delta';
import GitDelegator from '../git/GitDelegator';
import AbstractDatastore from './AbstractDatastore';

class DatastorePostList extends AbstractDatastore<ILegacyPortolfio> {
  private lastUpdatedDate: Date;
  private datastore: AsyncNedb<ILegacyPortolfio>;

  public constructor() {
    super();
    this.lastUpdatedDate = new Date();
    this.datastore = new AsyncNedb<ILegacyPortolfio>();
  }

  public async needsRepopulate(): Promise<boolean> {
    const age = TimeDelta.absoluteTimeDifferenceInHours(this.lastUpdatedDate, new Date());
    if ((await this.getCount()) === 0 || age >= 1) {
      return true;
    }
    console.log(`Legacy portfolio needs repopulate in ${1 - age}h`);
    return false;
  }

  public async populate(): Promise<ILegacyPortolfio> {
    console.log('Populating legacy portfolio…');

    // Empty datastore before
    await this.datastore.asyncRemove({}, { multi: true });

    // Populate from Github
    const gitService = GitDelegator.Instance;
    const portfolioReadme = (
      await gitService.getRepositoryFileContent('https://github.com/LoLei/portfolio/README.md')
    )?.content;

    // If the API call fails, do not repopulate the database and return the old entries
    if (portfolioReadme == null) {
      console.warn('Git API call failed, skipping db repopulation, returning old results');
      return this.getAll();
    }

    const insertPromise = this.datastore.asyncInsert({ portfolioReadme });
    this.lastUpdatedDate = new Date();
    return insertPromise;
  }

  private async getCount(): Promise<number> {
    return (await this.datastore.asyncFind({})).length;
  }

  public getAll(): Promise<ILegacyPortolfio> {
    return this.datastore.asyncFindOne({});
  }
}

export default DatastorePostList;
