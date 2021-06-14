import AbstractGitService, {
  IRepositoryContentEntry,
  IRepositoryContentEntryMetadata,
  IRepositoryMetadata,
} from './AbstractGitService';
import UrlParser from './UrlParser';

class GithubService extends AbstractGitService {
  public constructor() {
    super('https://api.github.com/repos');
  }

  public async getRepository(url: string): Promise<IRepositoryMetadata | undefined> {
    const urlParts = UrlParser.parseUrlPartsGithub(url);
    if (!urlParts.valid) {
      return undefined;
    }
    const res = await fetch(`${this.baseApiUrl}/${urlParts.owner}/${urlParts.repoName}`, {
      headers: new Headers({
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.mercy-preview+json', // mercy-preview needed for topics
      }),
    });
    if (!res.ok) {
      console.error(res.status, res.statusText);
      return undefined;
    }
    const { name, stargazers_count, language, topics, description } = await res.json();
    return { name, stargazersCount: stargazers_count, language, topics, description };
  }

  public async getRepositoryContentList(url: string): Promise<IRepositoryContentEntryMetadata[]> {
    const urlParts = UrlParser.parseUrlPartsGithub(url);
    if (!urlParts.valid) {
      return [];
    }
    const res = await fetch(`${this.baseApiUrl}/${urlParts.owner}/${urlParts.repoName}/contents`, {
      headers: new Headers({
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      }),
    });
    if (!res.ok) {
      console.error(res.status, res.statusText);
      return [];
    }
    const data: any[] = await res.json();
    return data
      .map(({ name, sha, size }) => {
        return { name, sha, size };
      })
      .reverse();
  }

  public async getRepositoryFileContent(url: string): Promise<IRepositoryContentEntry | undefined> {
    const urlParts = UrlParser.parseUrlPartsGithub(url);
    if (!urlParts.valid) {
      return undefined;
    }
    const res = await fetch(`${this.baseApiUrl}/${urlParts.owner}/${urlParts.repoName}/contents/${urlParts.fileName}`, {
      headers: new Headers({
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3.raw',
      }),
    });
    if (!res.ok) {
      console.error(res.status, res.statusText);
      return undefined;
    }
    const data: string = await res.text();
    return { id: urlParts.fileName!, fileName: urlParts.fileName!, content: data };
  }
}

export default GithubService;
