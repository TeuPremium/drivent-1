import { prisma } from '@/config';

async function findTicket(ticketId: string) {
  return await prisma.ticket.findFirst({
    where: {
      id: Number(ticketId),
    },
  });
}

export default {
  findTicket,
};
