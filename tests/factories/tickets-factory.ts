import faker from '@faker-js/faker';
import { TicketStatus } from '@prisma/client';
import { prisma } from '@/config';

export async function createTicketType(isRemote?: boolean, includesHotel?: boolean) {
  if (isRemote) {
    return prisma.ticketType.create({
      data: {
        name: faker.name.findName(),
        price: faker.datatype.number(),
        isRemote: true,
        includesHotel: false,
      },
    });
  } else if (!isRemote && !includesHotel) {
    return prisma.ticketType.create({
      data: {
        name: faker.name.findName(),
        price: faker.datatype.number(),
        isRemote: false,
        includesHotel: false,
      },
    });
  } else if (includesHotel) {
    return prisma.ticketType.create({
      data: {
        name: faker.name.findName(),
        price: faker.datatype.number(),
        isRemote: false,
        includesHotel: true,
      },
    });
  }
}

export async function createTicket(enrollmentId: number, ticketTypeId: number, status: TicketStatus) {
  return prisma.ticket.create({
    data: {
      enrollmentId,
      ticketTypeId,
      status,
    },
  });
}
