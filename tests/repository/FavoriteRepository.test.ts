import { NuxtAxiosInstance } from '@nuxtjs/axios';
import axios from 'axios';
import FavoriteRepositoryInterface from '~/repository/favorite/FavoriteRepositoryInterface';
import FavoriteRepository from '~/repository/favorite/FavoriteRepository';

/* axiosをモック化 */
jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve()),
  delete: jest.fn(() => Promise.resolve()),
}));

const testingFavoriteRepository: FavoriteRepositoryInterface = new FavoriteRepository(axios as NuxtAxiosInstance);

test('test register', async () => {
  const returnedPromise = testingFavoriteRepository.register({
    user_id: 100,
    shop_id: 100,
  });

  expect(returnedPromise).toEqual(Promise.resolve());

  const res = await returnedPromise;
  expect(res).toBeNull;
});

test('test delete', async () => {
  const returnedPromise = testingFavoriteRepository.delete(100, 100);

  expect(returnedPromise).toEqual(Promise.resolve());

  const res = await returnedPromise;
  expect(res).toBeNull;
});