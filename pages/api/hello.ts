// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { IRateLimit } from '../../util/git/AbstractGitService';
import GitDelegator from '../../util/git/GitDelegator';
import GithubService from '../../util/git/GithubService';
import GitlabService from '../../util/git/GitlabService';

type Data = {
  name: string;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
  const gitDelegator = GitDelegator.Instance;
  const githubService = gitDelegator.getServiceOfType('github') as GithubService;
  const gitlabService = gitDelegator.getServiceOfType('gitlab') as GitlabService;
  const githubPromise = githubService.checkRateLimit();
  const gitlabPromise = gitlabService.checkRateLimit();
  const [githubRate, gitlabRate] = (await Promise.allSettled([githubPromise, gitlabPromise]))
    .filter(({ status }) => status === 'fulfilled')
    .map((it) => (it as PromiseFulfilledResult<IRateLimit>).value);
  console.log({ githubRate });
  console.log({ gitlabRate });
  res.status(200).json({ name: 'John Doe' });
};
