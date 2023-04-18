import { prisma } from '@/config';

async function allTypes() {
  const types = await prisma.ticketType.findMany();

  return types;
}

async function userTicket(userId: number) {
  const ticket = await prisma.enrollment.findUnique({
    where: {
      userId: userId,
    },
    select: {
      Ticket: {
        include: {
          TicketType: true,
        },
      },
    },
  });

  return ticket;
}

async function userEnrollment(userId: number) {
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId,
    },
    select: {
      id: true,
    },
  });
  return enrollment;
}

async function createTicket(ticketTypeId: number, enrollmentId: number) {
  const ticket = await prisma.ticket.create({
    data: {
      ticketTypeId: ticketTypeId,
      enrollmentId: enrollmentId,
      status: 'RESERVED',
    },
  });
  return ticket;
}

async function findType(id: number) {
  const type = await prisma.ticketType.findUnique({
    where: { id: id },
  });

  return type;
}

export default {
  allTypes,
  userTicket,
  userEnrollment,
  createTicket,
  findType,
};
