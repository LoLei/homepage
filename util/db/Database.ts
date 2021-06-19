import DatastorePostList from './DatastorePostList';

class Database {
  private static _instance: Database;
  public readonly datastorePostList: DatastorePostList;

  private constructor() {
    this.datastorePostList = new DatastorePostList();
  }

  public static get Instance(): Database {
    return this._instance || (this._instance = new this());
  }
}

export default Database;
