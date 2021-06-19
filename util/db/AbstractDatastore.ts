abstract class AbstractDatastore<T> {
  public abstract needsRepopulate(): Promise<boolean>;
  public abstract populate(): Promise<T[] | T>;
  public abstract getAll(): Promise<T[] | T>;
}

export default AbstractDatastore;
