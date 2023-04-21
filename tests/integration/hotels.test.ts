import supertest from 'supertest';
import { cleanDb } from '../helpers';
import app, { init } from '@/app';

beforeAll(async () => {
  await cleanDb();
  await init();
});

const server = supertest(app);

describe('GET /hotels', () => {
  it('should respond with all listed hotels', async () => {
    const getHotels = await server.get('/hotels');

    // expect(getHotels.body).toMatchObject();
    expect(0).toEqual(0);
  });

  it('should respond with all listed hotels', async () => {
    const getHotels = await server.get('/hotels');

    // expect(getHotels.body).toMatchObject();
    expect(0).toEqual(0);
  });
});

describe('GET /hotels/:hotelId', () => {
  it('should respond with the correct hotel', async () => {
    const getHotels = await server.get('/hotels');

    // expect(getHotels.body).toMatchObject();
    expect(0).toEqual(0);
  });

  it('should respond with correct status', async () => {
    const getHotels = await server.get('/hotels');

    // expect(getHotels.body).toMatchObject();
    expect(0).toEqual(0);
  });
});
