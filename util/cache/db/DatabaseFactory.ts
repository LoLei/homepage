import IDatabase from './IDatabase';
import InMemoryNEDatabase from './InMemoryDatabase';

export enum DatabaseType {
  IN_MEMORY_NE,
}

function createDatabase<T>(type: DatabaseType.IN_MEMORY_NE): InMemoryNEDatabase<T>;
function createDatabase<T>(type: DatabaseType): IDatabase<T> {
  switch (type) {
    case DatabaseType.IN_MEMORY_NE:
      return new InMemoryNEDatabase<T>();
  }
}

export default createDatabase;
