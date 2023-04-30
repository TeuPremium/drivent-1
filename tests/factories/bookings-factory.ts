import { prisma } from '@/config';

async function createBooking(userId: number, roomId: number) {
  return await prisma.booking.create({
    data: {
      roomId,
      userId,
    },
  });
}

export default { createBooking };
