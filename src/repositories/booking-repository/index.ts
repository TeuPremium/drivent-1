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

async function findRoom(roomId: number) {
  const room = await prisma.room.findFirst({
    where: { id: roomId },
    include: { Booking: true },
  });

  return room;
}

export default { findBooking, addBooking, findRoom };
