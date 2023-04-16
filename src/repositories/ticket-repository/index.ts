import { prisma } from '@/config';

async function allTypes() {
  const types = await prisma.ticketType.findMany();

  return types;
}

async function userTicket(userId: number) {
  const ticket = await prisma.enrollment.findUnique({
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

  return ticket;
}

async function userEnrollment(userId: number) {
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId,
    },
    select: {
      id: true,
    },
  });
  return enrollment;
}

export default {
  allTypes,
  userTicket,
  userEnrollment,
};
