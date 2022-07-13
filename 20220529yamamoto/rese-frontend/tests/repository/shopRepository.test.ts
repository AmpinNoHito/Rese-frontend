import { NuxtAxiosInstance } from '@nuxtjs/axios';
import axios from 'axios';
import shopRepositoryInterface from '~/repository/shop/shopRepositoryInterface';
import shopRepository from "~/repository/shop/shopRepository";
import { shop } from "~/types/api";

/* モック化されたaxiosの戻り値の型 */
interface mockedAxiosResponse {
  data: shop | shop[],
}

/* axiosをモック化 */
let mockedAxiosResponse: mockedAxiosResponse;
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve(mockedAxiosResponse)),
  post: jest.fn(() => Promise.resolve()),
  put: jest.fn(() => Promise.resolve()),
}));

const testingShopRepository: shopRepositoryInterface = new shopRepository(axios as NuxtAxiosInstance);

/* 店舗データのモックを定義 */
const shopMock: shop = {
  id: 100,
  representative_id: 100,
  name: 'test',
  region: {
    id: 100,
    name: 'test',
  },
  genre: {
    id: 100,
    name: 'test',
  },
  description: 'test',
  image: 'test',
  courses: [{
    id: 100,
    name: 'test',
    price: 10000,
    description: 'test',
  }],
};

test('test register', async () => {
  const returnedPromise = testingShopRepository.register({
    name: 'test',
    representative_id: 100,
    description: 'test',
    base64EncodedImage: 'test',
    region_id: 100,
    genre_id: 100,
  });

  expect(returnedPromise).toEqual(Promise.resolve());

  await returnedPromise
    .then(res => expect(res).toBeNull);
});

test('test index', async () => {
  mockedAxiosResponse = {data: [shopMock]};

  const returnedPromise = testingShopRepository.index();

  expect(returnedPromise).toEqual(Promise.resolve(mockedAxiosResponse));

  await returnedPromise
    .then(res => expect(res).toEqual(mockedAxiosResponse));
});

test('test getById', async () => {
  mockedAxiosResponse = {data: shopMock};

  const returnedPromise = testingShopRepository.getById(100);

  expect(returnedPromise).toEqual(Promise.resolve(mockedAxiosResponse));

  await returnedPromise
    .then(res => expect(res).toEqual(mockedAxiosResponse));
});

test('test getByRepresentativeId', async () => {
  mockedAxiosResponse = {data: [shopMock]};

  const returnedPromise = testingShopRepository.getByRepresentativeId(100);

  expect(returnedPromise).toEqual(Promise.resolve(mockedAxiosResponse));

  await returnedPromise
    .then(res => expect(res).toEqual(mockedAxiosResponse));
});

test('test getByIdAsRepresentative', async () => {
  mockedAxiosResponse = {data: shopMock};

  const returnedPromise = testingShopRepository.getByIdAsRepresentative(100, 100);

  expect(returnedPromise).toEqual(Promise.resolve(mockedAxiosResponse));

  await returnedPromise
    .then(res => expect(res).toEqual(mockedAxiosResponse));
});

test('test getFavoriteShops', async () => {
  mockedAxiosResponse = {data: [shopMock]};

  const returnedPromise = testingShopRepository.getFavoriteShops(100);

  expect(returnedPromise).toEqual(Promise.resolve(mockedAxiosResponse));

  await returnedPromise
    .then(res => expect(res).toEqual(mockedAxiosResponse));
});

test('test update', async () => {
  const returnedPromise = testingShopRepository.update(100, {
    name: 'test',
    representative_id: 100,
    description: 'test',
    base64EncodedImage: 'test',
    region_id: 100,
    genre_id: 100,
  });

  expect(returnedPromise).toEqual(Promise.resolve());

  await returnedPromise
    .then(res => expect(res).toBeNull);
});