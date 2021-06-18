import AsyncNedb from 'nedb-async';
import TimeDelta from '../date/delta';
import { IRepositoryContentEntryMetadata } from '../git/AbstractGitService';
import GitDelegator from '../git/GitDelegator';

class Database {
  private static _instance: Database;
  private readonly datastorePostList: IInMemoryDataStore<IRepositoryContentEntryMetadata>;

  private constructor() {
    this.datastorePostList = {
      creationDate: new Date(),
      lastUpdatedDate: new Date(),
      datastore: new AsyncNedb<IRepositoryContentEntryMetadata>(),
    };
  }

  public static get Instance(): Database {
    return this._instance || (this._instance = new this());
  }

  public async datastorePostListNeedsRepopulate(): Promise<boolean> {
    // TODO: Move datastorePostList to separate class so this method can be reused
    const age = TimeDelta.absoluteTimeDifferenceInHours(
      this.datastorePostList.lastUpdatedDate,
      new Date()
    );
    if ((await this.getPostList()).length === 0 || age >= 1) {
      return true;
    }
    console.log(`Posts list needs repopulate in ${age}h`);
    return false;
  }

  public async populatePostList(): Promise<IRepositoryContentEntryMetadata[]> {
    console.log('Populating post list…');
    // Empty datastore before
    await this.datastorePostList.datastore.asyncRemove({}, { multi: true });

    // Populate from Github
    const gitService = GitDelegator.Instance;
    const posts = await gitService.getRepositoryContentList('https://github.com/LoLei/posts');

    // If the API call fails, do not repopulate the database and return the old entries
    if (posts == null || posts.length === 0) {
      console.warn('Git API call failed, skipping db repopulation, returning old results');
      return this.getPostList();
    }

    const insertPromises = posts.map((p) => this.datastorePostList.datastore.asyncInsert(p));
    this.datastorePostList.lastUpdatedDate = new Date();
    return Promise.all(insertPromises);
  }

  public getPostList(): Promise<IRepositoryContentEntryMetadata[]> {
    return this.datastorePostList.datastore.asyncFind({});
  }
}

export default Database;

interface IInMemoryDataStore<T> {
  creationDate: Date;
  lastUpdatedDate: Date;
  datastore: AsyncNedb<T>;
}
