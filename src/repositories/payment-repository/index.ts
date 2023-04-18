import { prisma } from '@/config';

async function findTicket(ticketId: string) {
  return await prisma.ticket.findFirst({
    where: {
      id: Number(ticketId),
    },
  });
}

async function payForTicket(ticketId: number, value: number, cardIssuer: string, cardLastDigits: string) {
  return prisma.payment.create({
    data: {
      ticketId,
      value,
      cardIssuer,
      cardLastDigits,
    },
  });
}

async function updateTciketStatus(ticketId: number) {
  await prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: { status: 'PAID' },
  });
}

async function findTicketinfo(ticketId: number, userId: number) {
  return prisma.enrollment.findFirst({
    where: {
      userId: userId,
    },
    select: {
      Ticket: {
        where: {
          id: Number(ticketId),
        },
      },
    },
  });
}

export default {
  findTicket,
  payForTicket,
  updateTciketStatus,
  findTicketinfo,
};
