import { prisma } from '@/config';

export async function getHotels() {
  return await prisma.hotel.findMany();
}

// export function getHotelRooms(name: string, capacity: number, id: number): Promise<Room> {
//   return prisma.hotel.create({
//     data: {
//       name,
//       hotelId,
//     },
//   });
// }
