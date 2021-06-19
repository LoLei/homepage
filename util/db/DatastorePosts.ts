import AsyncNedb from 'nedb-async';
import TimeDelta from '../date/delta';
import { IRepositoryContentEntry } from '../git/AbstractGitService';
import GitDelegator from '../git/GitDelegator';
import AbstractDatastore from './AbstractDatastore';

class DatastorePosts extends AbstractDatastore<IRepositoryContentEntry> {
  private lastUpdatedDate: Map<string, Date>;
  private datastore: AsyncNedb<IRepositoryContentEntry>;

  public constructor() {
    super();
    this.lastUpdatedDate = new Map<string, Date>();
    this.datastore = new AsyncNedb<IRepositoryContentEntry>();
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
    await this.datastore.asyncRemove({ id }, { multi: false });

    // Populate from Github
    const gitService = GitDelegator.Instance;
    const post = await gitService.getRepositoryFileContent(`https://github.com/LoLei/posts/${id}`);

    // If the API call fails, do not repopulate the database and return the old entries
    if (post == null) {
      console.warn('Git API call failed, skipping db repopulation, returning old results');
      return this.get(id);
    }

    const insertPromise = this.datastore.asyncInsert(post);
    this.lastUpdatedDate.set(id, new Date());
    return insertPromise;
  }

  public getAll(): Promise<IRepositoryContentEntry[]> {
    return this.datastore.asyncFind({});
  }

  private async getCount(id: string): Promise<number> {
    return (await this.datastore.asyncFind({ id })).length;
  }

  public async get(id: string): Promise<IRepositoryContentEntry> {
    return this.datastore.asyncFindOne({ id });
  }
}

export default DatastorePosts;
