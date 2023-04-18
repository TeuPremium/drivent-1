import Joi from 'joi';

const ticketSchema = Joi.object({
  ticketTypeId: Joi.number().required(),
});

export { ticketSchema };
