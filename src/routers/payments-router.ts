import { Router } from 'express';
import paymentsController from '@/controllers/payments-controller';

const paymentRouter = Router();

paymentRouter.get('/', paymentsController.getPayment);

export { paymentRouter };
