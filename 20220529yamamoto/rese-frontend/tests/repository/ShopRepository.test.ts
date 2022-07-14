import { NuxtAxiosInstance } from '@nuxtjs/axios';
import axios from 'axios';
import ShopRepositoryInterface from '~/repository/shop/ShopRepositoryInterface';
import ShopRepository from "~/repository/shop/ShopRepository";
import { SHOP } from '../consts';
import { ShopCollectionResponse, ShopResponse } from '~/types/axiosResponse';

/* モック化されたaxiosの戻り値の型 */
type mockAxiosResponse = ShopResponse | ShopCollectionResponse;

/* axiosをモック化 */
let mockAxiosResponse: mockAxiosResponse;
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve(mockAxiosResponse)),
  post: jest.fn(() => Promise.resolve()),
  put: jest.fn(() => Promise.resolve()),
}));

const testingShopRepository: ShopRepositoryInterface = new ShopRepository(axios as NuxtAxiosInstance);

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
  mockAxiosResponse = {
    data: {
      data: {
        shops: [SHOP],
        shopIds: [SHOP.id],
        regionIds: [SHOP.region.id],
        genreIds: [SHOP.genre.id],
      }
    }
  };

  const returnedPromise = testingShopRepository.index();

  expect(returnedPromise).toEqual(Promise.resolve(mockAxiosResponse));

  await returnedPromise
    .then(res => expect(res.data.data.shops[0]).toEqual(SHOP));
});

test('test getById', async () => {
  mockAxiosResponse = {
    data: {
      data: SHOP,
    }
  };

  const returnedPromise = testingShopRepository.getById(100);

  expect(returnedPromise).toEqual(Promise.resolve(mockAxiosResponse));

  await returnedPromise
    .then(res => expect(res.data.data).toEqual(SHOP));
});

test('test getByRepresentativeId', async () => {
  mockAxiosResponse = {
    data: {
      data: {
        shops: [SHOP],
        shopIds: [SHOP.id],
        regionIds: [SHOP.region.id],
        genreIds: [SHOP.genre.id],
      }
    }
  };

  const returnedPromise = testingShopRepository.getByRepresentativeId(100);

  expect(returnedPromise).toEqual(Promise.resolve(mockAxiosResponse));

  await returnedPromise
    .then(res => expect(res.data.data.shops[0]).toEqual(SHOP));
});

test('test getByIdAsRepresentative', async () => {
  mockAxiosResponse = {
    data: {
      data: SHOP,
    }
  };

  const returnedPromise = testingShopRepository.getByIdAsRepresentative(100, 100);

  expect(returnedPromise).toEqual(Promise.resolve(mockAxiosResponse));

  await returnedPromise
    .then(res => expect(res.data.data).toEqual(SHOP));
});

test('test getFavoriteShops', async () => {
  mockAxiosResponse = {
    data: {
      data: {
        shops: [SHOP],
        shopIds: [SHOP.id],
        regionIds: [SHOP.region.id],
        genreIds: [SHOP.genre.id],
      }
    }
  };

  const returnedPromise = testingShopRepository.getFavoriteShops(100);

  expect(returnedPromise).toEqual(Promise.resolve(mockAxiosResponse));

  await returnedPromise
    .then(res => expect(res.data.data.shops[0]).toEqual(SHOP));
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