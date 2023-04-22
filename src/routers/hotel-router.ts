import { Router } from 'express';
// eslint-disable-next-line import/namespace
import hotelController from '@/controllers/hotel-controller';

const hotelRouter = Router();

hotelRouter.get('/', hotelController.getAllHotels);

export { hotelRouter };
