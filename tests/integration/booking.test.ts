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
import bookingsFactory from '../factories/bookings-factory';
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

describe('GET /booking', () => {
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

  it('should respond with status code 404 when there is no booking', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);

    const response = await server.get('/booking').set('Authorization', `Bearer ${token}`);

    expect(response.status).toEqual(httpStatus.NOT_FOUND);
  });

  it('should respond with status code 200 with booking information', async () => {
    const hotel = generateValidHotel();
    const addHotel = await createHotel(hotel.name, hotel.image);

    const user = await createUser();
    const token = await generateValidToken(user);

    const enrollment = await createEnrollmentWithAddress(user);

    const ticketType = await createTicketType(false, true);
    await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);

    const room = generateValidRoom(addHotel.id);
    const roomInfo = await createRoom(room.name, room.capacity, room.hotelId);

    const { id, roomId } = await bookingsFactory.createBooking(user.id, roomInfo.id);

    const response = await server.get('/booking').set('Authorization', `Bearer ${token}`);

    expect(response.body).toEqual({
      id,
      Room: {
        id: roomId,
        capacity: expect.any(Number),
        name: expect.any(String),
        hotelId: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    });
    expect(response.status).toEqual(httpStatus.OK);
  });
});
