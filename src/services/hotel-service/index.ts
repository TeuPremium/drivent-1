import { getHotels } from '@/repositories/hotel-repository';
import { notFoundError } from '@/errors';
import ticketRepository from '@/repositories/ticket-repository';

async function getAllHotels(userId: number) {
  const enrollment = await ticketRepository.userEnrollment(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.userTicket(userId);
  const { Ticket } = ticket;
  // console.log(ticket);
  if (!Ticket[0]) {
    throw notFoundError();
  }
  const hotelList = await getHotels();

  if (!hotelList[0]) {
    throw notFoundError();
  }

  return hotelList;
}

async function getHotelById(id: number) {
  console.log(id);
  return 0;
}

const hotelServices = {
  getAllHotels,
  getHotelById,
};

export default hotelServices;
