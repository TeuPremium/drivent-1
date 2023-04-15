import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ticketRepository from '@/repositories/ticket-repository';

async function ticket(req: Request, res: Response) {
  try {
    const response = await ticketRepository.getAll();
    return res.status(httpStatus.OK).send(response);
  } catch (error) {}
}

export default { ticket };
