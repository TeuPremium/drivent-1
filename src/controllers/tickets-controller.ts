import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import ticketRepository from '@/repositories/ticket-repository';
import ticketServices from '@/services/ticket-services';

async function getTicketTypes(req: Request, res: Response, next: NextFunction) {
  try {
    const response = await ticketRepository.allTypes();
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

async function getTickets(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = res.locals;
    const response = await ticketServices.findTicket(userId);

    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    return res.status(404).send(error);
  }
}

export default {
  getTicketTypes,
  getTickets,
};
