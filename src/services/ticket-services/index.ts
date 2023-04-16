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

async function orderTicket(ticketTypeId: number) {
  try {
    console.log(ticketTypeId);
  } catch (error) {
    throw invalidDataError([`invalid ticket type`]);
  }
}

export default {
  findTicket,
  orderTicket,
};
