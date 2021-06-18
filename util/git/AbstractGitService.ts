abstract class AbstractGitService {
  protected baseApiUrl: string;

  protected constructor(baseApiUrl?: string) {
    this.baseApiUrl = baseApiUrl || '';
  }

  abstract getRepository(url: string): Promise<IRepositoryMetadata | undefined>;
  abstract getRepositoryContentList(url: string): Promise<IRepositoryContentEntryMetadata[]>;
  abstract getRepositoryFileContent(url: string): Promise<IRepositoryContentEntry | undefined>;
  abstract checkRateLimit(type?: GitServiceType): Promise<IRateLimit>;
}

export enum GitServiceType {
  GITHUB = 'github',
  GITLAB = 'gitlab',
}

export interface IRepositoryMetadata {
  name: string;
  stargazersCount: number;
  language: string;
  topics: string[];
  description: string;
  url: string;
  stargazersUrl: string;
}

export interface IRepositoryContentEntryMetadata {
  name: string;
  sha: string;
  size: number;
}

export interface IRepositoryContentEntry {
  id: string;
  fileName: string;
  content: string;
}

export interface IRateLimit {
  limit: number;
  used: number;
  remaining: number;
  reset: number;
}

export default AbstractGitService;
