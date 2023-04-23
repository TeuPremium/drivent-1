import { Hotel, Room } from '@prisma/client';
import { prisma } from '@/config';

export function getHotels() {
  return prisma.hotel.findMany({});
}

// export function getHotelRooms(name: string, capacity: number, id: number): Promise<Room> {
//   return prisma.hotel.create({
//     data: {
//       name,
//       hotelId,
//     },
//   });
// }
