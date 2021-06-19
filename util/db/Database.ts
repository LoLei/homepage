import DatastorePortfolioList from './DatastorePortfolioList';
import DatastorePostList from './DatastorePostList';

class Database {
  private static _instance: Database;
  public readonly datastorePostList: DatastorePostList;
  public readonly datastorePortfolioList: DatastorePortfolioList;

  private constructor() {
    this.datastorePostList = new DatastorePostList();
    this.datastorePortfolioList = new DatastorePortfolioList();
  }

  public static get Instance(): Database {
    return this._instance || (this._instance = new this());
  }
}

export default Database;
