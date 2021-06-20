interface IDatabase<T> {
  remove: (query: any, options?: any) => Promise<unknown>;
  find: (query: any) => Promise<T[]>;
  findOne: (query: any) => Promise<T>;
  insert: (newDoc: T) => Promise<T>;
}

export default IDatabase;
