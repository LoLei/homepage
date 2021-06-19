import DatastoreLegacyPortfolio from './DatastoreLegacyPortfolio';
import DatastorePortfolioList from './DatastorePortfolioList';
import DatastorePostList from './DatastorePostList';
import DatastorePosts from './DatastorePosts';

class Database {
  private static _instance: Database;
  public readonly datastorePostList: DatastorePostList;
  public readonly datastorePosts: DatastorePosts;
  public readonly datastorePortfolioList: DatastorePortfolioList;
  public readonly datastoreLegacyPortfolio: DatastoreLegacyPortfolio;

  private constructor() {
    this.datastorePostList = new DatastorePostList();
    this.datastorePosts = new DatastorePosts();
    this.datastorePortfolioList = new DatastorePortfolioList();
    this.datastoreLegacyPortfolio = new DatastoreLegacyPortfolio();
  }

  public static get Instance(): Database {
    return this._instance || (this._instance = new this());
  }
}

export default Database;
