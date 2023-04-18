import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import paymentService from '@/services/payment-service';

async function getPayment(req: Request, res: Response, next: NextFunction) {
  try {
    const { ticketId } = req.query;
    // const response = await paymentService.findPayment(ticketId);

    return res.status(httpStatus.OK);
  } catch (error) {}
}

async function postPayment(req: Request, res: Response, next: NextFunction) {
  try {
  } catch (error) {}
}

export default { getPayment, postPayment };
