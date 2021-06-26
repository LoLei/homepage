import TimeDelta from '../../date/delta';
import { IRepositoryContentEntryMetadata } from '../../git/AbstractGitService';
import GitDelegator from '../../git/GitDelegator';
import createDatabase, { DatabaseType } from '../db/DatabaseFactory';
import IDatabase from '../db/IDatabase';
import AbstractDatastore from './AbstractDatastore';

class DatastorePostList extends AbstractDatastore<IRepositoryContentEntryMetadata> {
  private lastUpdatedDate: Date;
  protected db: IDatabase<IRepositoryContentEntryMetadata>;

  public constructor() {
    super();
    this.lastUpdatedDate = new Date();
    this.db = createDatabase<IRepositoryContentEntryMetadata>(DatabaseType.IN_MEMORY_NE);
  }

  public async needsRepopulate(): Promise<boolean> {
    const age = TimeDelta.absoluteTimeDifferenceInHours(this.lastUpdatedDate, new Date());
    if (
      (await this.getAll()).length === 0 ||
      age >= parseInt(process.env.REFRESH_RATE_HOURS || '1')
    ) {
      return true;
    }
    console.log(
      `Posts list needs repopulate in ${parseInt(process.env.REFRESH_RATE_HOURS || '1') - age}h`
    );
    return false;
  }

  public async populate(): Promise<IRepositoryContentEntryMetadata[]> {
    console.log('Populating post list…');

    // Empty db before
    await this.db.remove({}, { multi: true });

    // Populate from Github
    const gitService = GitDelegator.Instance;
    const posts = await gitService.getRepositoryContentList('https://github.com/LoLei/posts');

    // If the API call fails, do not repopulate the database and return the old entries
    if (posts == null || posts.length === 0) {
      console.warn('Git API call failed, skipping db repopulation, returning old results');
      return this.getAll();
    }

    const insertPromises = posts.map((p) => this.db.insert(p));
    this.lastUpdatedDate = new Date();
    return Promise.all(insertPromises);
  }

  public getAll(): Promise<IRepositoryContentEntryMetadata[]> {
    return this.db.find({});
  }
}

export default DatastorePostList;
