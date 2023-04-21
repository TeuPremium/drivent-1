import { Hotel, Room } from '@prisma/client';
import { prisma } from '@/config';

export function createRoom(name: string, image: string): Promise<Hotel> {
  return prisma.hotel.create({
    data: {
      name,
      image,
    },
  });
}

export function createHotel(name: string, capacity: number, hotelId: number): Promise<Room> {
  return prisma.room.create({
    data: {
      name,
      capacity,
      hotelId,
    },
  });
}
