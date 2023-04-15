import { prisma } from '@/config';

async function getAll() {
  const response = await prisma.ticket.findMany();

  return response;
}

export default {
  getAll,
};
