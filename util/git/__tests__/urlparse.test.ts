import UrlParser from '../UrlParser';

describe('getGitServiceType', () => {
  test('returns github for github', () => {
    const result = UrlParser.getGitServiceType('https://github.com/LoLei/homepage');
    expect(result).toBe('github');
  });

  test('returns gitlab for gitlab', () => {
    const result = UrlParser.getGitServiceType('https://gitlab.com/cocainefarm/pastor');
    expect(result).toBe('gitlab');
  });

  test('returns undefined for anything else', () => {
    const result = UrlParser.getGitServiceType('https://bitbucket.com/Lolei/nonexistent');
    expect(result).toBe(undefined);
  });
});

describe('parseGitUrlParts', () => {
  test('returns valid and correct owner and repo name for a valid github url', () => {
    const result = UrlParser.parseGitUrlParts('https://github.com/LoLei/posts', 'github');
    expect(result).toStrictEqual({ valid: true, owner: 'LoLei', repoName: 'posts', fileName: undefined });
  });

  test('returns valid and correct owner and repo name for a valid gitlab url', () => {
    const result = UrlParser.parseGitUrlParts('https://gitlab.com/cocainefarm/pastor', 'gitlab');
    expect(result).toStrictEqual({ valid: true, owner: 'cocainefarm', repoName: 'pastor', fileName: undefined });
  });

  test('returns valid and correct owner, repo name and filename for a valid url', () => {
    const result = UrlParser.parseGitUrlParts('https://github.com/LoLei/posts/2000-01-01-my-post.md', 'github');
    expect(result).toStrictEqual({ valid: true, owner: 'LoLei', repoName: 'posts', fileName: '2000-01-01-my-post.md' });
  });

  test('returns invalid for an invalid url', () => {
    const result = UrlParser.parseGitUrlParts('https://github.comLoLeiposts/2000-01-01-my-post.md', 'github');
    expect(result).toStrictEqual({ valid: false });
  });
});
