import { notFoundError } from '@/errors';
import ticketRepository from '@/repositories/ticket-repository';

async function findTicket(userId: number) {
  try {
    console.log(userId);
    const { id } = await ticketRepository.userEnrollment(userId);
    if (!id) {
      throw notFoundError();
    }

    console.log('enrollment');
    console.log(id);

    const ticket = await ticketRepository.userTicket(userId);
    const { Ticket } = ticket;
    if (!Ticket[0]) {
      throw notFoundError();
    }
    console.log('Ticket');
    console.log(Ticket);

    return Ticket[0];
  } catch (error) {
    throw notFoundError();
  }
}

export default {
  findTicket,
};
