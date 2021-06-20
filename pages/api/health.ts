import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  health: Status;
};

enum Status {
  HEALTHY = 'healthy',
  UNHEALTHY = 'unhealthy',
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
  res.status(200).json({ health: Status.HEALTHY });
};
