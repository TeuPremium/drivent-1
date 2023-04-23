import { prisma } from '@/config';

export async function getHotels() {
  return await prisma.hotel.findMany();
}

export function getHotelRooms(hotelId: number) {
  return prisma.hotel.findUnique({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    },
  });
}
