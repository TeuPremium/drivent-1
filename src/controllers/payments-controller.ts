import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import paymentService from '@/services/payment-service';

async function getPayment(req: Request, res: Response, next: NextFunction) {
  try {
    const { ticketId } = req.query as Record<string, string>;
    const { userId } = res.locals;
    if (!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);
    const response = await paymentService.findTicketInfo(ticketId, userId);

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

    if (!ticketId || !cardData) return res.sendStatus(httpStatus.BAD_REQUEST);

    const response = await paymentService.postPayment(ticketId, cardData, userId);

    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    next(error);
  }
}

export default { getPayment, postPayment };
