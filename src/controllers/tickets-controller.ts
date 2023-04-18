import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import ticketRepository from '@/repositories/ticket-repository';
import ticketServices from '@/services/ticket-services';
import { invalidDataError } from '@/errors';

async function getTicketTypes(req: Request, res: Response) {
  try {
    const response = await ticketRepository.allTypes();
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    return res.sendStatus(500);
  }
}

async function getTickets(req: Request, res: Response) {
  try {
    const { userId } = res.locals;
    const response = await ticketServices.findTicket(userId);

    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    return res.status(404).send(error);
  }
}

async function postTickets(req: Request, res: Response) {
  try {
    const { ticketTypeId }: { ticketTypeId: number } = req.body;
    const { userId } = res.locals;
    const response = await ticketServices.orderTicket(ticketTypeId, userId);

    console.log(response);

    res.status(httpStatus.CREATED).send(response);
  } catch (error) {
    // return res.sendStatus(500);
    throw invalidDataError([`invalid ticket format`]);
  }
}

export default {
  getTicketTypes,
  getTickets,
  postTickets,
};
