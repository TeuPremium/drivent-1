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

async function findTicketinfo(ticketId: number) {
  return await prisma.payment.findFirst({
    where: {
      ticketId: ticketId,
    },
  });
}

export default {
  findTicket,
  payForTicket,
  updateTciketStatus,
  findTicketinfo,
};
