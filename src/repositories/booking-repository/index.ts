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

async function addBooking(userId: number, roomId: number) {
  return await prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}

export default { findBooking, addBooking };
