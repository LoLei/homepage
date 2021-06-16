import AbstractGitService, {
  IRepositoryContentEntry,
  IRepositoryContentEntryMetadata,
  IRepositoryMetadata,
} from './AbstractGitService';
import GithubService from './GithubService';
import GitlabService from './GitlabService';
import UrlParser from './UrlParser';

/**
 * Singleton that holds concrete git services to which requests are delegated, according to their URL, so far:
 * - Github
 * - Gitlab
 */
class GitDelegator extends AbstractGitService {
  private static _instance: GitDelegator;
  private readonly services: Map<string, AbstractGitService>;

  private constructor(services: Map<string, AbstractGitService>) {
    super();
    this.services = services;
  }

  public static get Instance(): GitDelegator {
    return (
      this._instance ||
      (this._instance = new this(
        new Map<string, AbstractGitService>([
          ['github', new GithubService()],
          ['gitlab', new GitlabService()],
        ])
      ))
    );
  }

  private callMethodWithAppropriateService(
    methodName: 'getRepository' | 'getRepositoryContentList' | 'getRepositoryFileContent',
    url: string
  ):
    | Promise<IRepositoryMetadata | undefined>
    | Promise<IRepositoryContentEntryMetadata[]>
    | Promise<IRepositoryContentEntry | undefined> {
    const serviceName = UrlParser.getGitServiceType(url);
    if (this.services.has(serviceName || '')) {
      return this.services.get(serviceName!)![methodName](url);
    }
    console.error(`Unsupported git URL: ${url}`);
    console.warn('Attempting Github service as fallback');
    return this.services.get('github')![methodName](url);
  }

  public getRepository(url: string): Promise<IRepositoryMetadata | undefined> {
    return this.callMethodWithAppropriateService('getRepository', url) as Promise<
      IRepositoryMetadata | undefined
    >;
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
