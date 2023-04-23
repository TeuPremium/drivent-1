import { Router } from 'express';
// eslint-disable-next-line import/namespace
import hotelController from '@/controllers/hotel-controller';
import { authenticateToken } from '@/middlewares';

const hotelRouter = Router();

hotelRouter.all('/*', authenticateToken);
hotelRouter.get('/', hotelController.getAllHotels);
hotelRouter.get('/:id', hotelController.getHotelById);

export { hotelRouter };
