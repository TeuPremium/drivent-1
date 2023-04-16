import { Router } from 'express';
import ticketsController from '@/controllers/tickets-controller';
import { authenticateToken } from '@/middlewares';

const ticketRouter = Router();
ticketRouter.all('/*', authenticateToken);
ticketRouter.get('/types/', ticketsController.getTicketTypes);
ticketRouter.get('/', ticketsController.getTickets);

export { ticketRouter };
