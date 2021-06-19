abstract class AbstractDatastore<T> {
  public abstract needsRepopulate(): Promise<boolean>;
  public abstract populate(): Promise<T[]>;
  public abstract getAll(): Promise<T[]>;
}

export default AbstractDatastore;