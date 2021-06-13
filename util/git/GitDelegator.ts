import AbstractGitService, {
  IRepositoryContentEntry,
  IRepositoryContentEntryMetadata,
  IRepositoryMetadata,
} from './AbstractGitService';
import GithubService from './GithubService';
import GitlabService from './GitlabService';

// TODO: Rename to GitService, and have Github/Gitlab inherit from it
class GitDelegator extends AbstractGitService {
  private static _instance: GitDelegator;
  private readonly services: Map<string, AbstractGitService>;

  public constructor() {
    super();
    this.services = new Map<string, AbstractGitService>();
    this.services.set('github', new GithubService());
    this.services.set('gitlab', new GitlabService());
  }

  public static get Instance(): GitDelegator {
    return this._instance || (this._instance = new this());
  }

  private getGitServiceType(url: string): string | undefined {
    const match = /https:\/\/(?<serviceName>github|gitlab).com.*/.exec(url);
    if (match == null) {
      return undefined;
    }
    return match.groups?.serviceName;
  }

  getRepository(url: string): Promise<IRepositoryMetadata | undefined> {
    const serviceName = this.getGitServiceType(url);
    if (this.services.has(serviceName || '')) {
      return this.services.get(serviceName!)!.getRepository(url);
    }
    console.error(`Unsupported git URL: ${url}`);
    console.warn('Attempting Github service as fallback');
    return this.services.get('github')!.getRepository(url);
  }

  getRepositoryContentList(url: string): Promise<IRepositoryContentEntryMetadata[]> {
    const serviceName = this.getGitServiceType(url);
    if (this.services.has(serviceName || '')) {
      return this.services.get(serviceName!)!.getRepositoryContentList(url);
    }
    console.error(`Unsupported git URL: ${url}`);
    console.warn('Attempting Github service as fallback');
    return this.services.get('github')!.getRepositoryContentList(url);
  }

  getRepositoryFileContent(url: string): Promise<IRepositoryContentEntry | undefined> {
    const serviceName = this.getGitServiceType(url);
    if (this.services.has(serviceName || '')) {
      return this.services.get(serviceName!)!.getRepositoryFileContent(url);
    }
    console.error(`Unsupported git URL: ${url}`);
    console.warn('Attempting Github service as fallback');
    return this.services.get('github')!.getRepositoryFileContent(url);
  }
}

export default GitDelegator;
