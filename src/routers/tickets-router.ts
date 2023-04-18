import { Router } from 'express';
import ticketsController from '@/controllers/tickets-controller';
import { authenticateToken, validateBody } from '@/middlewares';
import { ticketSchema } from '@/schemas';

const ticketRouter = Router();
ticketRouter.all('/*', authenticateToken);
ticketRouter.get('/types/', ticketsController.getTicketTypes);
ticketRouter.get('/', ticketsController.getTickets);
ticketRouter.post('/', validateBody(ticketSchema), ticketsController.postTickets);

export { ticketRouter };
