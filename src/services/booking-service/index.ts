import bookingRepository from '@/repositories/booking-repository';
import { getHotelRooms } from '@/repositories/hotel-repository';
import { notFoundError } from '@/errors';
import ticketRepository from '@/repositories/ticket-repository';
import { paymentRequiredError } from '@/errors/payment-required-error';

async function createBooking(userId: number, roomId: number) {
  const enrollment = await ticketRepository.userEnrollment(userId);
  console.log(enrollment);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.userTicket(userId);
  const { Ticket } = ticket;
  console.log(ticket);
  if (!Ticket[0]) {
    throw notFoundError();
  }
  if (Ticket[0].status != 'PAID') {
    throw paymentRequiredError();
  }

  const hotelRooms = await getHotelRooms(roomId);
  console.log(hotelRooms);
  const { ticketTypeId } = Ticket[0];
  const { isRemote, includesHotel } = await ticketRepository.findType(ticketTypeId);

  if (isRemote || !includesHotel) {
    throw paymentRequiredError();
  }

  if (!hotelRooms) {
    throw notFoundError();
  }

  const booking = await bookingRepository.addBooking(userId, roomId);
  console.log(booking);
  return booking;
}

export default { createBooking };
