abstract class AbstractGitService {
  abstract getRepository(owner: string, repoName: string): Promise<IRepositoryMetadata | undefined>;
  abstract getRepositoryContentList(repoName: string): Promise<IRepositoryContentEntryMetadata[]>;
  abstract getRepositoryFileContent(repoName: string, fileName: string): Promise<IRepositoryContentEntry | undefined>;
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

export default AbstractGitService;
