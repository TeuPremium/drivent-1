import { NextFunction, Request, Response } from 'express';
import bookingRepository from '@/repositories/booking-repository';
import { notFoundError } from '@/errors';
import bookingService from '@/services/booking-service';

async function getBooking(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = res.locals;
    const booking = await bookingRepository.findBooking(userId);
    if (booking == null) {
      throw notFoundError();
    }
    return res.status(200).send(booking);
  } catch (error) {
    next(error);
  }
}

async function postBooking(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = res.locals;
    const { roomId } = req.body;
    if (roomId == undefined) {
      console.log(roomId);
      throw notFoundError;
    }
    const booking = await bookingService.createBooking(roomId, userId);

    console.log(booking);
    return res.send(booking).status(200);
  } catch (error) {
    next(error);
  }
}

export default { getBooking, postBooking };
