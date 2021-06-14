import AbstractGitService, {
  IRepositoryContentEntry,
  IRepositoryContentEntryMetadata,
  IRepositoryMetadata,
  IUrlParseResult,
} from './AbstractGitService';

class GitlabService extends AbstractGitService {
  public constructor() {
    // TODO: Change
    super('https://api.github.com/repos');
  }

  protected parseUrlParts(url: string): IUrlParseResult {
    console.error(`${this.constructor.name} not yet implemented`);
    return { valid: false };
  }

  public async getRepository(url: string): Promise<IRepositoryMetadata | undefined> {
    console.error(`${this.constructor.name} not yet implemented`);
    return undefined;
  }

  public async getRepositoryContentList(url: string): Promise<IRepositoryContentEntryMetadata[]> {
    console.error(`${this.constructor.name} not yet implemented`);
    return [];
  }

  public async getRepositoryFileContent(url: string): Promise<IRepositoryContentEntry | undefined> {
    console.error(`${this.constructor.name} not yet implemented`);
    return undefined;
  }
}

export default GitlabService;
