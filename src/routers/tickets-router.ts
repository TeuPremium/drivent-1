import { Router } from 'express';
import { ticket } from '@/controllers';

const ticketRouter = Router();

ticketRouter.get('/', ticket);

export { ticketRouter };
