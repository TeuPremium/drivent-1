import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import paymentService from '@/services/payment-service';

async function getPayment(req: Request, res: Response, next: NextFunction) {
  try {
    const { ticketId } = req.query as Record<string, string>;
    console.log(ticketId);
    const { userId } = res.locals;

    const response = await paymentService.findTicketInfo(ticketId, userId);

    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    next(error);
  }
}

async function postPayment(req: Request, res: Response, next: NextFunction) {
  try {
  } catch (error) {
    next(error);
  }
}

export default { getPayment, postPayment };
