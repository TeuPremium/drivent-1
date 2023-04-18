import { invalidDataError, notFoundError } from '@/errors';
import ticketRepository from '@/repositories/ticket-repository';

async function findTicket(userId: number) {
  try {
    const { id } = await ticketRepository.userEnrollment(userId);
    if (!id) {
      throw notFoundError();
    }
    const ticket = await ticketRepository.userTicket(userId);
    const { Ticket } = ticket;
    if (!Ticket[0]) {
      throw notFoundError();
    }
    return Ticket[0];
  } catch (error) {
    throw notFoundError();
  }
}

async function orderTicket(ticketTypeId: number, userId: number) {
  try {
    const enrollment = await ticketRepository.userEnrollment(userId);
    if (!enrollment) {
      throw notFoundError();
    }

    const reserve = await ticketRepository.createTicket(ticketTypeId, enrollment.id);
    const TicketType = await ticketRepository.findType(ticketTypeId);
    if (!TicketType) {
      throw notFoundError();
    }
    return {
      id: reserve.id,
      status: reserve.status,
      ticketTypeId: reserve.ticketTypeId,
      enrollmentId: reserve.enrollmentId,
      TicketType,
      createdAt: reserve.createdAt,
      updatedAt: reserve.updatedAt,
    };
  } catch (error) {
    throw error;
  }
}

export default {
  findTicket,
  orderTicket,
};
