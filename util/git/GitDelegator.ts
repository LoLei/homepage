import AbstractGitService, {
  IRepositoryContentEntry,
  IRepositoryContentEntryMetadata,
  IRepositoryMetadata,
} from './AbstractGitService';
import GithubService from './GithubService';
import GitlabService from './GitlabService';

// TODO: Rename to GitService, and have Github/Gitlab inherit from it,
//  if possible/it makes sense
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

  private callMethodWithAppropriateService(
    methodName: 'getRepository' | 'getRepositoryContentList' | 'getRepositoryFileContent',
    url: string
  ):
    | Promise<IRepositoryMetadata | undefined>
    | Promise<IRepositoryContentEntryMetadata[]>
    | Promise<IRepositoryContentEntry | undefined> {
    const serviceName = this.getGitServiceType(url);
    if (this.services.has(serviceName || '')) {
      return this.services.get(serviceName!)![methodName](url);
    }
    console.error(`Unsupported git URL: ${url}`);
    console.warn('Attempting Github service as fallback');
    return this.services.get('github')![methodName](url);
  }

  public getRepository(url: string): Promise<IRepositoryMetadata | undefined> {
    return this.callMethodWithAppropriateService('getRepository', url) as Promise<IRepositoryMetadata | undefined>;
  }

  public getRepositoryContentList(url: string): Promise<IRepositoryContentEntryMetadata[]> {
    return this.callMethodWithAppropriateService('getRepositoryContentList', url) as Promise<
      IRepositoryContentEntryMetadata[]
    >;
  }

  public getRepositoryFileContent(url: string): Promise<IRepositoryContentEntry | undefined> {
    return this.callMethodWithAppropriateService('getRepositoryFileContent', url) as Promise<
      IRepositoryContentEntry | undefined
    >;
  }
}

export default GitDelegator;
