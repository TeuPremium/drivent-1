import { strict } from 'assert';
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
    console.log(error);
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
    console.log(ticketTypeId);
    res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    throw invalidDataError([`invalid ticket format`]);
  }
}

export default {
  getTicketTypes,
  getTickets,
};
