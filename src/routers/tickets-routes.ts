import { Router } from 'express';
import ticketsController from '@/controllers/tickets-controller';

const ticketRoutes = Router();

ticketRoutes.post('/ticket', ticketsController.ticket);

export default ticketRoutes;
