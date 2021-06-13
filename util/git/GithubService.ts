import AbstractGitService, {
  IRepositoryContentEntry,
  IRepositoryContentEntryMetadata,
  IRepositoryMetadata,
} from './AbstractGitService';

class GithubService extends AbstractGitService {
  public async getRepository(owner: string, repoName: string): Promise<IRepositoryMetadata | undefined> {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repoName}`, {
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

  public async getRepositoryContentList(repoName: string): Promise<IRepositoryContentEntryMetadata[]> {
    const res = await fetch(`https://api.github.com/repos/LoLei/${repoName}/contents`, {
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

  public async getRepositoryFileContent(
    repoName: string,
    fileName: string
  ): Promise<IRepositoryContentEntry | undefined> {
    const res = await fetch(`https://api.github.com/repos/LoLei/${repoName}/contents/${fileName}`, {
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
    return { id: fileName, fileName: fileName, content: data };
  }
}

export default GithubService;
