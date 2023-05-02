import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import bookingController from '@/controllers/booking-controller';

const bookingRouter = Router();

bookingRouter.all('/*', authenticateToken);
bookingRouter.get('/', bookingController.getBooking);
bookingRouter.post('/', bookingController.postBooking);

export { bookingRouter };
