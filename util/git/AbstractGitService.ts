abstract class AbstractGitService {
  protected baseApiUrl: string;

  protected constructor(baseApiUrl?: string) {
    this.baseApiUrl = baseApiUrl || '';
  }

  abstract getRepository(url: string): Promise<IRepositoryMetadata | undefined>;
  abstract getRepositoryContentList(url: string): Promise<IRepositoryContentEntryMetadata[]>;
  abstract getRepositoryFileContent(url: string): Promise<IRepositoryContentEntry | undefined>;
}

export interface IRepositoryMetadata {
  name: string;
  stargazersCount: number;
  language: string;
  topics: string[];
  description: string;
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

export interface IUrlParseResult {
  valid: boolean;
  owner?: string;
  repoName?: string;
  fileName?: string;
}

export default AbstractGitService;
