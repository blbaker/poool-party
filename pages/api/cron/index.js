import prisma from '../../../lib/prisma';
import moment from 'moment';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { authorization } = req.headers;

      if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
        const expenses = await prisma.expense.findMany({
          select: {
            id: true,
            name: true,
            creatorId: true,
            active: true,
            interval: true,
          },
          where: {
            active: true,
            startDate: {
              gte: new Date(),
            },
            OR: [
              {
                interval: 'week',
                lastRequest: {
                  lte: moment().subtract(7, 'days').toDate(),
                },
              },
              {
                interval: 'month',
                lastRequest: {
                  lte: moment().subtract(1, 'months').toDate(),
                },
              },
            ],
          },
        });

        for (const expense of expenses) {
          const expenseUsers = await prisma.expenseUser.findMany({
            where: { expenseId: expense?.id },
            select: {
              expenseId: true,
              amount: true,
              userId: true,
              user: {
                select: {
                  userId: true,
                  venmo: { select: { id: true, accessToken: true } },
                },
              },
            },
          });

          for (const expenseUser of expenseUsers) {
            // Don't create venmo request for expense creator
            if (expenseUser?.user?.userId !== expense?.creatorId) {
              // Start venmo request
              const result = await fetch('https://api.venmo.com/v1/payments', {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${expenseUser?.user?.venmo?.accessToken}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  note: expense?.name,
                  amount: `-${parseFloat(expenseUser?.amount)}`,
                  user_id: expenseUser?.user?.venmo?.id,
                  audience: 'private',
                }),
              });
              const response = await result.json();

              await prisma.request.create({
                data: {
                  amount: parseFloat(expenseUser?.amount),
                  expense: { connect: { id: expense?.id } },
                  user: { connect: { id: expenseUser?.userId } },
                  name: expense?.name,
                  status: response?.data?.payment?.status || 'failed',
                  paid: false,
                  paymentId: response?.data?.payment?.id,
                },
              });
            }

            await prisma.expense.update({
              where: { id: expense?.id },
              data: {
                lastRequest: new Date(),
              },
            });
          }
        }

        return res.status(200).json({ success: true });
      } else {
        res.status(401).json({ success: false });
      }
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
