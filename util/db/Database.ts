import DatastoreLegacyPortfolio from './DatastoreLegacyPortfolio';
import DatastorePortfolioList from './DatastorePortfolioList';
import DatastorePostList from './DatastorePostList';

class Database {
  private static _instance: Database;
  public readonly datastorePostList: DatastorePostList;
  public readonly datastorePortfolioList: DatastorePortfolioList;
  public readonly datastoreLegacyPortfolio: DatastoreLegacyPortfolio;

  private constructor() {
    this.datastorePostList = new DatastorePostList();
    this.datastorePortfolioList = new DatastorePortfolioList();
    this.datastoreLegacyPortfolio = new DatastoreLegacyPortfolio();
  }

  public static get Instance(): Database {
    return this._instance || (this._instance = new this());
  }
}

export default Database;
