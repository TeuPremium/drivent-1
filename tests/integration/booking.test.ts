import supertest from 'supertest';
import faker from '@faker-js/faker';
import * as jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import { TicketStatus } from '@prisma/client';
import { cleanDb, generateValidToken } from '../helpers';
import {
  createEnrollmentWithAddress,
  createHotel,
  createRoom,
  createTicket,
  createTicketType,
  createUser,
} from '../factories';
import { prisma } from '@/config';
import app, { init } from '@/app';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const generateValidHotel = () => ({
  name: faker.name.lastName(),
  image: faker.image.city(),
});

const generateValidRoom = (hotelId: number) => ({
  name: faker.name.firstName(),
  hotelId,
  capacity: Math.floor(Math.random() * 10),
});

const server = supertest(app);

describe('GET /booking', async () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/booking');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/booking').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/booking').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
});
