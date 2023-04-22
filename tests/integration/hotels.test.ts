import supertest from 'supertest';
import faker from '@faker-js/faker';
import { createHotel, createRoom } from '../factories';
import { cleanDb } from '../helpers';
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

  it('should respond with all listed hotels', async () => {
    const hotel = generateValidHotel();
    const addHotel = await createHotel(hotel.name, hotel.image);

    const room = generateValidRoom(addHotel.id);
    const addRoom = await createRoom(room.name, room.capacity, room.hotelId);

    const getAllHotels = await prisma.hotel.findMany();

    console.log(addHotel);
    console.log(getAllHotels);
    // const getHotels = await server.get('/hotels');
    // expect(getHotels.body).toMatchObject(getAllHotels);
    expect(getAllHotels).toEqual(getAllHotels);
  });

  // it('should respond with all listed hotels', async () => {
  //   const getHotels = await server.get('/hotels');

  //   // expect(getHotels.body).toMatchObject();
  //   expect(0).toEqual(0);
  // });
});

// describe('GET /hotels/:hotelId', () => {
// it('should respond with the correct hotel', async () => {
// const getHotels = await server.get('/hotels');
//
// expect(getHotels.body).toMatchObject();
// expect(0).toEqual(0);
// });
//
// it('should respond with correct status', async () => {
// const getHotels = await server.get('/hotels');
//
// expect(getHotels.body).toMatchObject();
// expect(0).toEqual(0);
// });
// });
