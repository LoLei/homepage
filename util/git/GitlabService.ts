import AbstractGitService, {
  IRepositoryContentEntry,
  IRepositoryContentEntryMetadata,
  IRepositoryMetadata,
} from './AbstractGitService';
import UrlParser from './UrlParser';

class GitlabService extends AbstractGitService {
  public constructor() {
    // TODO: Change
    super('https://gitlab.com/api/v4/projects');
  }

  public async getRepository(url: string): Promise<IRepositoryMetadata | undefined> {
    const urlParts = UrlParser.parseGitUrlParts(url, 'gitlab');
    if (!urlParts.valid) {
      return undefined;
    }
    const res = await fetch(`${this.baseApiUrl}/${urlParts.owner}%2F${urlParts.repoName}`);
    if (!res.ok) {
      console.error(res.status, res.statusText);
      return undefined;
    }
    const { name, star_count, topics, description } = await res.json();
    const repoMetadata = { name, stargazersCount: star_count, language: "", topics, description };

    // Extra call for languages necessary in GitLab
    const langRes = await fetch(`${this.baseApiUrl}/${urlParts.owner}%2F${urlParts.repoName}/languages`);
    const languages = await langRes.json();
    // They seem to be sorted
    const topLang = Object.keys(languages)[0];
    repoMetadata.language = topLang;

    return repoMetadata;
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
