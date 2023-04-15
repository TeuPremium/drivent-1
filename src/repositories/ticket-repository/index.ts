import { prisma } from '@/config';

async function getAll() {
  const response = await prisma.ticketType.findMany();

  return response;
}

export default {
  getAll,
};
