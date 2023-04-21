import { Request, Response, NextFunction } from 'express';
import hotelServices from '@/services/hotel-service';

async function getAllHotels(req: Request, res: Response, next: NextFunction) {
  try {
    const hotelList = await hotelServices.getAllHotels;
    return res.status(200).send(hotelList);
  } catch (error) {
    next(error);
  }
}

async function getHotelById(req: Request, res: Response, next: NextFunction) {
  try {
    const hotel = await hotelServices.getAllHotels;
    return res.status(200).send(hotel);
  } catch (error) {
    next(error);
  }
}

export default { getAllHotels, getHotelById };
