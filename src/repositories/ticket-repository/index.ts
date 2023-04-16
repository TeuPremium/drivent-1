import { prisma } from '@/config';

async function allTypes() {
  const response = await prisma.ticketType.findMany();

  return response;
}

async function userTicket(userId: number) {
  const response = await prisma.enrollment.findUnique({
    where: {
      userId: userId,
    },
    select: {
      Ticket: {
        include: {
          TicketType: true,
        },
      },
    },
  });

  return response;
}

export default {
  allTypes,
  userTicket,
};
