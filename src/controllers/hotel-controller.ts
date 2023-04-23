import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import hotelServices from '@/services/hotel-service';

async function getAllHotels(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = res.locals;
    const hotelList = await hotelServices.getAllHotels(userId);

    return res.status(httpStatus.OK).send(hotelList);
  } catch (error) {
    next(error);
  }
}

async function getHotelById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { userId } = res.locals;
    const hotel = await hotelServices.getHotelById(userId, parseInt(id));

    return res.status(200).send(hotel);
  } catch (error) {
    next(error);
  }
}

export default { getAllHotels, getHotelById };
