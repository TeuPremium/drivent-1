import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import ticketRepository from '@/repositories/ticket-repository';
import ticketServices from '@/services/ticket-services';
import { invalidDataError } from '@/errors';

async function getTicketTypes(req: Request, res: Response, next: NextFunction) {
  try {
    const response = await ticketRepository.allTypes();
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    next(error);
  }
}

async function getTickets(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = res.locals;
    const response = await ticketServices.findTicket(userId);

    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    next(error);
  }
}

async function postTickets(req: Request, res: Response, next: NextFunction) {
  try {
    const { ticketTypeId }: { ticketTypeId: number } = req.body;
    const { userId } = res.locals;
    const response = await ticketServices.orderTicket(ticketTypeId, userId);
    res.status(httpStatus.CREATED).send(response);
  } catch (error) {
    next(error);
  }
}

export default {
  getTicketTypes,
  getTickets,
  postTickets,
};
