// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { IRateLimit } from '../../util/git/AbstractGitService';
import GitDelegator from '../../util/git/GitDelegator';
import GithubService from '../../util/git/GithubService';
import GitlabService from '../../util/git/GitlabService';

type Data = {
  githubRate: IRateLimit | string;
  gitlabRate: IRateLimit | string;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
  const gitDelegator = GitDelegator.Instance;
  const githubService = gitDelegator.getServiceOfType('github') as GithubService;
  const gitlabService = gitDelegator.getServiceOfType('gitlab') as GitlabService;
  const githubPromise = githubService.checkRateLimit();
  const gitlabPromise = gitlabService.checkRateLimit();
  const [githubRate, gitlabRate] = (await Promise.allSettled([githubPromise, gitlabPromise])).map(
    (it) => {
      if (it.status === 'fulfilled') {
        return (it as PromiseFulfilledResult<IRateLimit>).value;
      }
      return (it as PromiseRejectedResult).reason.toString();
    }
  );
  res.status(200).json({ githubRate: githubRate, gitlabRate: gitlabRate });
};
