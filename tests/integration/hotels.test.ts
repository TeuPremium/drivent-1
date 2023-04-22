import supertest from 'supertest';
import faker from '@faker-js/faker';
import * as jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import { TicketStatus } from '@prisma/client';
import {
  createEnrollmentWithAddress,
  createHotel,
  createRoom,
  createTicket,
  createTicketType,
  createUser,
} from '../factories';
import { cleanDb, generateValidToken } from '../helpers';
import { prisma } from '@/config';
import app, { init } from '@/app';

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe('GET /hotels', () => {
  const generateValidHotel = () => ({
    name: faker.name.lastName(),
    image: faker.image.city(),
  });

  const generateValidRoom = (hotelId: number) => ({
    name: faker.name.firstName(),
    hotelId,
    capacity: Math.floor(Math.random() * 10),
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status code 404 when there are no hotels', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);

    const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it('should respond with status code 404 when there are no enrollments', async () => {
    const hotel = generateValidHotel();

    const user = await createUser();
    const token = await generateValidToken(user);

    const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

    expect(response.status).toEqual(httpStatus.NOT_FOUND);
  });

  it('should respond with status code 404 when there are no tickets', async () => {
    const hotel = generateValidHotel();

    const user = await createUser();
    const token = await generateValidToken(user);
    const enrollment = await createEnrollmentWithAddress(user);

    const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

    expect(response.status).toEqual(httpStatus.NOT_FOUND);
  });

  it('should respond with status code 402 when ticket is not payed', async () => {
    const hotel = generateValidHotel();

    const user = await createUser();
    const token = await generateValidToken(user);
    const enrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createTicketType();
    const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);

    const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

    expect(response.status).toEqual(httpStatus.PAYMENT_REQUIRED);
  });

  it('should respond all listed hotels with status code 200 with valid token', async () => {
    const hotel = generateValidHotel();

    const user = await createUser();
    const enrollment = await createEnrollmentWithAddress(user);
    const token = await generateValidToken(user);
    const ticketType = await createTicketType();
    const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);

    const addHotel = await createHotel(hotel.name, hotel.image);

    const room = generateValidRoom(addHotel.id);
    await createRoom(room.name, room.capacity, room.hotelId);

    const findHotels = await prisma.hotel.findUnique({
      include: { Rooms: true },
      where: {
        id: addHotel.id,
      },
    });

    const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

    expect(response.body).toMatchObject(findHotels);
    expect(response.status).toEqual(httpStatus.OK);
  });
});

// describe('GET /hotels/:hotelId', () => {
// it('should respond with the correct hotel', async () => {
// const response = await server.get('/hotels');
//
// expect(response.body).toMatchObject();
// expect(0).toEqual(0);
// });
//
// it('should respond with correct status', async () => {
// const response = await server.get('/hotels');
//
// expect(response.body).toMatchObject();
// expect(0).toEqual(0);
// });
// });
