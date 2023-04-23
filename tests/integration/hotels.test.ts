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

const generateValidHotel = () => ({
  name: faker.name.lastName(),
  image: faker.image.city(),
});

//criar erros de body invalido//

const generateValidRoom = (hotelId: number) => ({
  name: faker.name.firstName(),
  hotelId,
  capacity: Math.floor(Math.random() * 10),
});

describe('GET /hotels', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/hotels');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
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

  it('should respond with status code 404 when there are no enrollments', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);

    const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

    expect(response.status).toEqual(httpStatus.NOT_FOUND);
  });

  it('should respond with status code 404 when there are no tickets', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);

    const enrollment = await createEnrollmentWithAddress(user);

    const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

    expect(response.status).toEqual(httpStatus.NOT_FOUND);
  });

  it('should respond with status code 402 when ticket is not payed', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);

    const enrollment = await createEnrollmentWithAddress(user);

    const ticketType = await createTicketType();
    const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);

    const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

    expect(response.status).toEqual(httpStatus.PAYMENT_REQUIRED);
  });

  it('should respond with status code 404 when there are no hotels listed', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);

    const enrollment = await createEnrollmentWithAddress(user);

    const ticketType = await createTicketType();
    const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);

    const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it('should respond with status code 402 when ticket is remote', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);

    const enrollment = await createEnrollmentWithAddress(user);

    const ticketType = await createTicketType(true);
    const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);

    const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.PAYMENT_REQUIRED);
  });

  it('should respond with status code 402 when ticket does not include hotel', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);

    const enrollment = await createEnrollmentWithAddress(user);

    const ticketType = await createTicketType(false, false);
    const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);

    const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.PAYMENT_REQUIRED);
  });

  it('should respond all listed hotels with status code 200 with valid token', async () => {
    const hotel = generateValidHotel();
    const addHotel = await createHotel(hotel.name, hotel.image);

    const user = await createUser();
    const token = await generateValidToken(user);

    const enrollment = await createEnrollmentWithAddress(user);

    const ticketType = await createTicketType(false, true);
    const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
    console.log(ticket);

    const room = generateValidRoom(addHotel.id);
    await createRoom(room.name, room.capacity, room.hotelId);

    const findHotels = await prisma.hotel.findUnique({
      include: { Rooms: true },
      where: {
        id: addHotel.id,
      },
    });

    // const allrooms = await prisma.hotel.findMany({ include: { Rooms: true } });

    // console.log(allrooms);

    const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
    console.log(findHotels);
    expect(response.body).toMatchObject(findHotels);
    expect(response.status).toEqual(httpStatus.OK);
  });
});

// describe('GET /hotels/:hotelId', () => {
//   it('should respond with status 401 if no token is given', async () => {
//     const response = await server.get('/hotels/1');

//     expect(response.status).toBe(httpStatus.UNAUTHORIZED);
//   });
//   it('should respond with status 401 if there is no session for given token', async () => {
//     const userWithoutSession = await createUser();
//     const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

//     const response = await server.get('/hotels/1').set('Authorization', `Bearer ${token}`);

//     expect(response.status).toBe(httpStatus.UNAUTHORIZED);
//   });

//   it('should respond with status 401 if given token is not valid', async () => {
//     const token = faker.lorem.word();

//     const response = await server.get('/hotels/1').set('Authorization', `Bearer ${token}`);

//     expect(response.status).toBe(httpStatus.UNAUTHORIZED);
//   });

//   it('should respond with status code 404 when there are no enrollments', async () => {
//     const user = await createUser();
//     const token = await generateValidToken(user);

//     const response = await server.get('/hotels/1').set('Authorization', `Bearer ${token}`);

//     expect(response.status).toEqual(httpStatus.NOT_FOUND);
//   });

//   it('should respond with status code 404 when there are no tickets', async () => {
//     const user = await createUser();
//     const token = await generateValidToken(user);

//     const enrollment = await createEnrollmentWithAddress(user);

//     const response = await server.get('/hotels/1').set('Authorization', `Bearer ${token}`);

//     expect(response.status).toEqual(httpStatus.NOT_FOUND);
//   });

//   it('should respond with status code 402 when ticket is not payed', async () => {
//     const user = await createUser();
//     const token = await generateValidToken(user);

//     const enrollment = await createEnrollmentWithAddress(user);

//     const ticketType = await createTicketType();
//     const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);

//     const response = await server.get('/hotels/1').set('Authorization', `Bearer ${token}`);

//     expect(response.status).toEqual(httpStatus.PAYMENT_REQUIRED);
//   });

//   it('should respond with status code 404 when there are no hotels', async () => {
//     const user = await createUser();
//     const token = await generateValidToken(user);

//     const enrollment = await createEnrollmentWithAddress(user);

//     const ticketType = await createTicketType();
//     const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);

//     const response = await server.get('/hotels/1').set('Authorization', `Bearer ${token}`);

//     expect(response.status).toBe(httpStatus.NOT_FOUND);
//   });

//   it('should respond with status code 404 when there are no hotel rooms', async () => {
//     const user = await createUser();
//     const token = await generateValidToken(user);

//     const enrollment = await createEnrollmentWithAddress(user);

//     const ticketType = await createTicketType();
//     const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);

//     const response = await server.get('/hotels/1').set('Authorization', `Bearer ${token}`);

//     expect(response.status).toBe(httpStatus.NOT_FOUND);
//   });

//   it('should respond with correct status', async () => {
//     const hotel = generateValidHotel();
//     const room = generateValidRoom();
//     const response = await server.get('/hotels/:id');

//     // expect(response.body).toMatchObject(findHotels);
//     // expect(response.status).toEqual(httpStatus.OK);
//   });
// });
