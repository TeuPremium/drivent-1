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

  const paymentInfo = await paymentRepository.findTicketinfo(parseInt(ticketId));

  return paymentInfo;
}

async function postPayment(ticketId: number, cardData: object, userId: number) {
  const enrollmentInfo = await ticketRepository.userTicket(userId);

  const { issuer, number } = cardData as Record<string, string>;

  const cardLastDigits = number.toString().slice(-4);

  const ticketInfo = await paymentRepository.findTicket(ticketId.toString());

  if (!ticketInfo) throw notFoundError();

  const ticketType = await ticketRepository.findType(ticketInfo.ticketTypeId);

  if (!enrollmentInfo.Ticket[0]) throw unauthorizedError();

  const payTicket = await paymentRepository.payForTicket(ticketId, ticketType.price, issuer, cardLastDigits);

  await paymentRepository.updateTciketStatus(ticketId);

  return payTicket;
}

const paymentService = {
  findTicketInfo,
  postPayment,
};
export default paymentService;
