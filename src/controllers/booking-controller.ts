import { NextFunction, Request, Response } from 'express';
import bookingRepository from '@/repositories/booking-repository';

async function getBooking(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = res.locals;
    const booking = await bookingRepository.findBooking(userId);
    return res.status(200).send(booking);
  } catch (error) {
    next(error);
  }
}

export default { getBooking };
