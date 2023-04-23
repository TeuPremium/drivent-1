import { getHotels } from '@/repositories/hotel-repository';

async function getAllHotels() {
  return getHotels();
}

async function getHotelById(id: number) {
  console.log(id);
  return 0;
}

const hotelServices = {
  getAllHotels,
  getHotelById,
};

export default hotelServices;
