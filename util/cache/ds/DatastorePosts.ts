import TimeDelta from '../../date/delta';
import { IRepositoryContentEntry } from '../../git/AbstractGitService';
import GitDelegator from '../../git/GitDelegator';
import createDatabase, { DatabaseType } from '../db/DatabaseFactory';
import IDatabase from '../db/IDatabase';
import AbstractDatastore from './AbstractDatastore';

class DatastorePosts extends AbstractDatastore<IRepositoryContentEntry> {
  private lastUpdatedDate: Map<string, Date>;
  protected db: IDatabase<IRepositoryContentEntry>;

  public constructor() {
    super();
    this.lastUpdatedDate = new Map<string, Date>();
    this.db = createDatabase<IRepositoryContentEntry>(DatabaseType.IN_MEMORY_NE);
  }

  public async needsRepopulate(id: string): Promise<boolean> {
    if (!this.lastUpdatedDate.has(id)) {
      return true;
    }
    const age = TimeDelta.absoluteTimeDifferenceInHours(this.lastUpdatedDate.get(id)!, new Date());
    if ((await this.getCount(id)) === 0 || age >= 1) {
      return true;
    }
    console.log(`Posts needs repopulate in ${1 - age}h`);
    return false;
  }

  public async populate(id: string): Promise<IRepositoryContentEntry> {
    console.log(`Populating posts with post ID ${id}…`);

    // Remove entry before
    await this.db.remove({ id }, { multi: false });

    // Populate from Github
    const gitService = GitDelegator.Instance;
    const post = await gitService.getRepositoryFileContent(`https://github.com/LoLei/posts/${id}`);

    // If the API call fails, do not repopulate the database and return the old entries
    if (post == null) {
      console.warn('Git API call failed, skipping db repopulation, returning old results');
      return this.get(id);
    }

    const insertPromise = this.db.insert(post);
    this.lastUpdatedDate.set(id, new Date());
    return insertPromise;
  }

  public getAll(): Promise<IRepositoryContentEntry[]> {
    return this.db.find({});
  }

  private async getCount(id: string): Promise<number> {
    return (await this.db.find({ id })).length;
  }

  public async get(id: string): Promise<IRepositoryContentEntry> {
    return this.db.findOne({ id });
  }
}

export default DatastorePosts;
