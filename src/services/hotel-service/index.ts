import { getHotels } from '@/repositories/hotel-repository';
import { notFoundError } from '@/errors';
import ticketRepository from '@/repositories/ticket-repository';
import { paymentRequiredError } from '@/errors/payment-required-error';

async function getAllHotels(userId: number) {
  const enrollment = await ticketRepository.userEnrollment(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.userTicket(userId);
  const { Ticket } = ticket;
  if (!Ticket[0]) {
    throw notFoundError();
  }
  if (Ticket[0].status != 'PAID') {
    throw paymentRequiredError();
  }

  const hotelList = await getHotels();

  const { ticketTypeId } = Ticket[0];
  const { isRemote, includesHotel } = await ticketRepository.findType(ticketTypeId);

  if (isRemote || !includesHotel) {
    throw paymentRequiredError();
  }

  if (!hotelList[0]) {
    throw notFoundError();
  }

  return hotelList;
}

async function getHotelById(userId: number, hotelId: number) {
  const enrollment = await ticketRepository.userEnrollment(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.userTicket(userId);
  const { Ticket } = ticket;
  if (!Ticket[0]) {
    throw notFoundError();
  }
  if (Ticket[0].status != 'PAID') {
    throw paymentRequiredError();
  }

  const hotelList = await getHotels();

  const { ticketTypeId } = Ticket[0];
  const { isRemote, includesHotel } = await ticketRepository.findType(ticketTypeId);

  if (isRemote || !includesHotel) {
    throw paymentRequiredError();
  }

  if (!hotelList[0]) {
    throw notFoundError();
  }

  return hotelList;
}

const hotelServices = {
  getAllHotels,
  getHotelById,
};

export default hotelServices;
