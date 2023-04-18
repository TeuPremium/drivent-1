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

export default {
  allTypes,
  userTicket,
  userEnrollment,
  createTicket,
};

// id        Int       @id @default(autoincrement())
// name      String    @db.VarChar(255)
// cpf       String    @db.VarChar(255)
// birthday  DateTime
// phone     String    @db.VarChar(255)
// userId    Int       @unique
// User      User      @relation(fields: [userId], references: [id])
// Address   Address[]
// createdAt DateTime  @default(now())
// updatedAt DateTime  @updatedAt
// Ticket    Ticket[]
