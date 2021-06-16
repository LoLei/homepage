import AbstractGitService, {
  IRepositoryContentEntry,
  IRepositoryContentEntryMetadata,
  IRepositoryMetadata,
} from './AbstractGitService';
import UrlParser from './UrlParser';

class GitlabService extends AbstractGitService {
  public constructor() {
    super('https://gitlab.com/api/v4/projects');
  }

  public async getRepositoryMetadata(owner: string, repoName: string): Promise<IRepositoryMetadata | undefined> {
    const res = await fetch(`${this.baseApiUrl}/${owner}%2F${repoName}`);
    if (!res.ok) {
      console.error(res.status, res.statusText);
      return undefined;
    }
    const { name, star_count, topics, description } = await res.json();
    return { name, stargazersCount: star_count, language: '', topics, description };
  }

  public async getRepositoryLanguages(owner: string, repoName: string): Promise<string[]> {
    const langRes = await fetch(`${this.baseApiUrl}/${owner}%2F${repoName}/languages`);
    const languages = await langRes.json();
    return Object.keys(languages);
  }

  public async getRepository(url: string): Promise<IRepositoryMetadata | undefined> {
    const urlParts = UrlParser.parseGitUrlParts(url, 'gitlab');
    if (!urlParts.valid) {
      return undefined;
    }

    const repoDataMainPromise = this.getRepositoryMetadata(urlParts.owner!, urlParts.repoName!);
    // Extra call for languages necessary in GitLab
    const repoDataLanguagesPromise = this.getRepositoryLanguages(urlParts.owner!, urlParts.repoName!);

    const [repoDataMain, repoDataLanguages] = await Promise.all([repoDataMainPromise, repoDataLanguagesPromise]);

    if (repoDataMain == null) {
      return undefined;
    }

    repoDataMain.language = repoDataLanguages[0];
    return repoDataMain;
  }

  public async getRepositoryContentList(url: string): Promise<IRepositoryContentEntryMetadata[]> {
    console.error(`${this.constructor.name} getRepositoryContentList function not yet implemented`);
    return [];
  }

  public async getRepositoryFileContent(url: string): Promise<IRepositoryContentEntry | undefined> {
    console.error(`${this.constructor.name} getRepositoryFileContent function not yet implemented`);
    return undefined;
  }
}

export default GitlabService;
