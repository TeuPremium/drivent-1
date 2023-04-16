import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ticketRepository from '@/repositories/ticket-repository';

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
    const response = await ticketRepository.userTicket(userId);
    console.log(response);
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export default {
  getTicketTypes,
  getTickets,
};
