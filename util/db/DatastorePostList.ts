import AsyncNedb from 'nedb-async';
import TimeDelta from '../date/delta';
import { IRepositoryContentEntryMetadata } from '../git/AbstractGitService';
import GitDelegator from '../git/GitDelegator';
import AbstractDatastore from './AbstractDatastore';

class DatastorePostList extends AbstractDatastore<IRepositoryContentEntryMetadata> {
  private lastUpdatedDate: Date;
  private datastore: AsyncNedb<IRepositoryContentEntryMetadata>;

  public constructor() {
    super();
    this.lastUpdatedDate = new Date();
    this.datastore = new AsyncNedb<IRepositoryContentEntryMetadata>();
  }

  public async needsRepopulate(): Promise<boolean> {
    const age = TimeDelta.absoluteTimeDifferenceInHours(this.lastUpdatedDate, new Date());
    if ((await this.getAll()).length === 0 || age >= 1) {
      return true;
    }
    console.log(`Posts list needs repopulate in ${1 - age}h`);
    return false;
  }

  public async populate(): Promise<IRepositoryContentEntryMetadata[]> {
    console.log('Populating post list…');
    // Empty datastore before
    await this.datastore.asyncRemove({}, { multi: true });

    // Populate from Github
    const gitService = GitDelegator.Instance;
    const posts = await gitService.getRepositoryContentList('https://github.com/LoLei/posts');

    // If the API call fails, do not repopulate the database and return the old entries
    if (posts == null || posts.length === 0) {
      console.warn('Git API call failed, skipping db repopulation, returning old results');
      return this.getAll();
    }

    const insertPromises = posts.map((p) => this.datastore.asyncInsert(p));
    this.lastUpdatedDate = new Date();
    return Promise.all(insertPromises);
  }

  public getAll(): Promise<IRepositoryContentEntryMetadata[]> {
    return this.datastore.asyncFind({});
  }
}

export default DatastorePostList;
