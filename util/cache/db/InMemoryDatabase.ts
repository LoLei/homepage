import AsyncNedb from 'nedb-async';
import IDatabase from './IDatabase';

class InMemoryNEDatabase<T> implements IDatabase<T> {
  private driver = new AsyncNedb<T>();
  public remove(query: any, options?: any): Promise<unknown> {
    return this.driver.asyncRemove(query, options);
  }
  public find(query: any): Promise<T[]> {
    return this.driver.asyncFind(query);
  }
  findOne(query: any): Promise<T> {
    return this.driver.asyncFindOne(query);
  }
  insert(newDoc: T): Promise<T> {
    return this.driver.asyncInsert(newDoc);
  }
}

export default InMemoryNEDatabase;
