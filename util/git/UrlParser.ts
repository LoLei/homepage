import { GitServiceType } from './AbstractGitService';

class UrlParser {
  public static getGitServiceType(url: string): GitServiceType | undefined {
    const match = /https:\/\/(?<serviceName>github|gitlab).com.*/.exec(url);
    if (match == null) {
      return undefined;
    }
    const name = match.groups?.serviceName;
    if (name == null) {
      return undefined;
    }
    return name === 'github' ? GitServiceType.GITHUB : GitServiceType.GITLAB;
  }

  public static parseGitUrlParts(url: string, repoType: GitServiceType): IUrlParseResult {
    const regex =
      repoType === GitServiceType.GITHUB
        ? /https:\/\/github.com\/(?<owner>[\w-_]+)\/(?<repoName>[\w-_]+)\/?(?<fileName>[\w-_.]+)?/
        : /https:\/\/gitlab.com\/(?<owner>[\w-_]+)\/(?<repoName>[\w-_]+)\/?(?<fileName>[\w-_.]+)?/;
    const match = regex.exec(url);
    if (match == null) {
      return { valid: false };
    }
    return {
      valid: true,
      owner: match.groups?.owner,
      repoName: match.groups?.repoName,
      fileName: match.groups?.fileName,
    };
  }
}

export default UrlParser;

export interface IUrlParseResult {
  valid: boolean;
  owner?: string;
  repoName?: string;
  fileName?: string;
}
