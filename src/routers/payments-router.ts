import { Router } from 'express';
import paymentsController from '@/controllers/payments-controller';
import { authenticateToken } from '@/middlewares';

const paymentRouter = Router();

paymentRouter.all('/*', authenticateToken);

paymentRouter.get('/', paymentsController.getPayment);
paymentRouter.post('/process/', paymentsController.postPayment);

export { paymentRouter };
