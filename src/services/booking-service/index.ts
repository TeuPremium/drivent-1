import bookingRepository from '@/repositories/booking-repository';
import { forbiddenError, notFoundError } from '@/errors';
import ticketRepository from '@/repositories/ticket-repository';

async function createBooking(userId: number, roomId: number) {
  const enrollment = await ticketRepository.userEnrollment(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketRepository.userTicket(userId);
  const { Ticket } = ticket;
  if (!Ticket[0]) throw notFoundError();
  if (Ticket[0].status != 'PAID') throw forbiddenError();

  const { ticketTypeId } = Ticket[0];
  const { isRemote, includesHotel } = await ticketRepository.findType(ticketTypeId);

  if (isRemote || !includesHotel) throw forbiddenError();

  const hotelRooms = await bookingRepository.findRoom(roomId);
  if (!hotelRooms) throw notFoundError();
  if (hotelRooms.Booking[0]) throw forbiddenError();

  const booking = await bookingRepository.addBooking(userId, roomId);

  return booking;
}

async function updateBooking(userId: number, roomId: number) {
  const hotelRooms = await bookingRepository.findRoom(roomId);
  if (!hotelRooms) throw notFoundError();
  if (hotelRooms.Booking[0]) throw forbiddenError();

  const previousBooking = await bookingRepository.findBooking(userId);
  if (!previousBooking) throw forbiddenError();

  await bookingRepository.removeBooking(previousBooking.id);

  const booking = await bookingRepository.addBooking(userId, roomId);

  return booking;
}

export default { createBooking, updateBooking };
