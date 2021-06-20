import type { NextApiRequest, NextApiResponse } from 'next';
import { GitServiceType, IRateLimit } from '../../util/git/AbstractGitService';
import GitDelegator from '../../util/git/GitDelegator';

type Data = {
  githubRate: IRateLimit | string;
  gitlabRate: IRateLimit | string;
};

const checkRateLimitOfServices = async (): Promise<Data> => {
  const gitDelegator = GitDelegator.Instance;
  const githubPromise = gitDelegator.checkRateLimit(GitServiceType.GITHUB);
  const gitlabPromise = gitDelegator.checkRateLimit(GitServiceType.GITLAB);
  const [githubRate, gitlabRate] = (await Promise.allSettled([githubPromise, gitlabPromise])).map(
    (it) => {
      if (it.status === 'fulfilled') {
        return (it as PromiseFulfilledResult<IRateLimit>).value;
      }
      return (it as PromiseRejectedResult).reason.toString();
    }
  ) as (IRateLimit | string)[];

  return { githubRate, gitlabRate };
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
  res.status(200).json(await checkRateLimitOfServices());
};
