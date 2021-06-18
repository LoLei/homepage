import AbstractGitService, {
  GitServiceType,
  IRateLimit,
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
        new Map<GitServiceType, AbstractGitService>([
          [GitServiceType.GITHUB, new GithubService()],
          [GitServiceType.GITLAB, new GitlabService()],
        ])
      ))
    );
  }

  public getServiceOfType(type: GitServiceType): AbstractGitService {
    return this.services.get(type)!;
  }

  private async callMethodWithAppropriateService(
    methodName: 'getRepository' | 'getRepositoryContentList' | 'getRepositoryFileContent',
    url: string
  ): Promise<
    IRepositoryMetadata | IRepositoryContentEntryMetadata[] | IRepositoryContentEntry | undefined
  > {
    const serviceName = UrlParser.getGitServiceType(url);
    const service = this.services.get(serviceName!);

    if (service != null) {
      if ((await service.checkRateLimit()).remaining > 0) {
        return service[methodName](url);
      }
      console.warn(`Git service ${serviceName} has reached the rate limit.`);
      return;
    }
    console.error(`Service not supported: ${url}`);
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

  public async checkRateLimit(type: GitServiceType): Promise<IRateLimit> {
    return await this.services.get(type)!.checkRateLimit();
  }
}

export default GitDelegator;
