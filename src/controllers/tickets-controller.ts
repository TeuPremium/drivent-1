import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ticketRepository from '@/repositories/ticket-repository';

export async function ticket(req: Request, res: Response) {
  try {
    console.log(`awa`);
    const response = await ticketRepository.getAll();
    console.log(response);
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
