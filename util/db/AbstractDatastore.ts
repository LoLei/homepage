// TODO: This could be an interface
abstract class AbstractDatastore<T> {
  public abstract needsRepopulate(id?: string): Promise<boolean>;
  public abstract populate(ids?: string | string[]): Promise<T[] | T>;
  public abstract getAll(): Promise<T[] | T>;
}

export default AbstractDatastore;
