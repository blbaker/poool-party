import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';
import { pick } from '../../../lib/utils';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(403).end();
  }

  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    select: {
      id: true,
      venmo: { select: { id: true, accessToken: true } },
    },
  });

  if (!user?.venmo?.accessToken) {
    return res.status(403).end();
  }

  if (!Number(req?.query?.id)) {
    return res.status(400).end();
  }

  const pool = await prisma.pool.findUnique({
    where: {
      id: Number(req?.query?.id) || -1,
    },
    select: {
      id: true,
      name: true,
      users: {
        select: {
          id: true,
          venmo: {
            select: {
              id: true,
              username: true,
              displayName: true,
              image: true,
              user: { select: { toy: true } },
            },
          },
        },
      },
      expenses: {
        select: {
          id: true,
          name: true,
          active: true,
          createdAt: true,
          interval: true,
          total: true,
          draft: true,
        },
        where: {
          draft: false,
        },
      },
    },
  });

  if (!pool) {
    return res.status(404).end();
  }

  const poolUser = await prisma.poolUser.findUnique({
    where: {
      venmopoolId: {
        venmoId: user?.venmo?.id,
        poolId: pool?.id,
      },
    },
    select: {
      poolId: true,
      venmoId: true,
      draft: true,
    },
  });

  res.json(Object.assign({}, pool, pick(poolUser, ['draft'])));
}
