import IDatabase from '../db/IDatabase';

abstract class AbstractDatastore<T> {
  protected abstract db: IDatabase<T>;
  public abstract needsRepopulate(id?: string): Promise<boolean>;
  public abstract populate(ids?: string | string[]): Promise<T[] | T>;
  public abstract getAll(): Promise<T[] | T>;
}

export default AbstractDatastore;
