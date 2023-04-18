import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import paymentService from '@/services/payment-service';
import { requestError } from '@/errors';

async function getPayment(req: Request, res: Response, next: NextFunction) {
  try {
    const { ticketId } = req.query as Record<string, string>;
    const { userId } = res.locals;

    const response = await paymentService.findTicketInfo(ticketId, userId);
    console.log(response);
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    next(error);
  }
}

async function postPayment(req: Request, res: Response, next: NextFunction) {
  try {
    const info = req.body;
    const ticketId = info.ticketId;
    const cardData = info.cardData;
    const { userId } = res.locals;
    if (!ticketId || !cardData) {
      console.log('invalidos');
      throw requestError(400, `invalid payment data`);
    }

    const response = await paymentService.postPayment(ticketId, cardData, userId);

    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    next(error);
  }
}

export default { getPayment, postPayment };
