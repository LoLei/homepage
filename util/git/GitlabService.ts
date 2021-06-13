import AbstractGitService, {
  IRepositoryContentEntry,
  IRepositoryContentEntryMetadata,
  IRepositoryMetadata,
} from './AbstractGitService';

class GitlabService extends AbstractGitService {
  public async getRepository(owner: string, repoName: string): Promise<IRepositoryMetadata | undefined> {
    console.error(`${this.constructor.name} not yet implemented`);
    return undefined;
  }

  public async getRepositoryContentList(repoName: string): Promise<IRepositoryContentEntryMetadata[]> {
    console.error(`${this.constructor.name} not yet implemented`);
    return [];
  }

  public async getRepositoryFileContent(
    repoName: string,
    fileName: string
  ): Promise<IRepositoryContentEntry | undefined> {
    console.error(`${this.constructor.name} not yet implemented`);
    return undefined;
  }
}

export default GitlabService;
