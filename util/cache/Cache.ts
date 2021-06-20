import DatastoreLegacyPortfolio from './ds/DatastoreLegacyPortfolio';
import DatastorePortfolioList from './ds/DatastorePortfolioList';
import DatastorePostList from './ds/DatastorePostList';
import DatastorePosts from './ds/DatastorePosts';

class Cache {
  private static _instance: Cache;
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

  public static get Instance(): Cache {
    return this._instance || (this._instance = new this());
  }
}

export default Cache;
