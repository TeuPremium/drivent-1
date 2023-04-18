import paymentRepository from '@/repositories/payment-repository';
import { notFoundError, requestError } from '@/errors';

async function findTicketInfo(ticketId: any, userId: number) {
  const id = parseInt(ticketId);
  if (!id) {
    throw requestError(400, `invalid ticket`);
  }
  const ticketInfo = await paymentRepository.findTicket(ticketId);
  if (!ticketInfo) {
    throw notFoundError();
  }
  console.log(ticketInfo);
  console.log(id);
  return id;
}

const paymentService = {
  findTicketInfo,
};
export default paymentService;
