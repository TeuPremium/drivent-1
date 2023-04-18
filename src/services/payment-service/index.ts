import paymentRepository from '@/repositories/payment-repository';
import { notFoundError, requestError, unauthorizedError } from '@/errors';
import ticketRepository from '@/repositories/ticket-repository';

async function findTicketInfo(ticketId: string, userId: number) {
  const id = parseInt(ticketId);
  if (!id) {
    throw requestError(400, `invalid ticket`);
  }
  const ticketInfo = await paymentRepository.findTicket(ticketId);
  if (!ticketInfo) {
    throw notFoundError();
  }

  const enrollmentInfo = await ticketRepository.userTicket(userId);
  if (!enrollmentInfo.Ticket[0]) {
    throw unauthorizedError();
  }
  console.log('ticket');
  console.log(ticketInfo);
  console.log('enroll');

  console.log(enrollmentInfo.Ticket);

  return ticketInfo;
}

const paymentService = {
  findTicketInfo,
};
export default paymentService;
