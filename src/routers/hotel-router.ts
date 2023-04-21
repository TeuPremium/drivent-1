import { Router } from 'express';
import hotelController from '@/controllers/hotel-controller';

const hotelRouter = Router();

hotelRouter.get('/', hotelController.getAllHotels);

export { hotelRouter };
