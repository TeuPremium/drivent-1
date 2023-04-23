import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import hotelServices from '@/services/hotel-service';
import { prisma } from '@/config';

async function getAllHotels(req: Request, res: Response, next: NextFunction) {
  try {
    const hotelList = await hotelServices.getAllHotels();

    console.log(hotelList);
    // return res.status(200).send(hotelList);
    return res.status(httpStatus.OK).send(hotelList);
  } catch (error) {
    next(error);
  }
}

async function getHotelById(req: Request, res: Response, next: NextFunction) {
  try {
    const hotel = await hotelServices.getAllHotels();
    return res.status(200).send(hotel);
  } catch (error) {
    next(error);
  }
}

export default { getAllHotels, getHotelById };
