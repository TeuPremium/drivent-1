import { prisma } from '@/config';

async function findBooking(userId: number) {
  return await prisma.booking.findFirst({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      Room: true,
    },
  });
}

export default { findBooking };
