import { NuxtAxiosInstance } from '@nuxtjs/axios';
import axios from 'axios';
import favoriteRepositoryInterface from '~/repository/favorite/favoriteRepositoryInterface';
import favoriteRepository from '~/repository/favorite/favoriteRepository';

/* axiosをモック化 */
jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve()),
  delete: jest.fn(() => Promise.resolve()),
}));

const testingFavoriteRepository: favoriteRepositoryInterface = new favoriteRepository(axios as NuxtAxiosInstance);

test('test register', async () => {
  const returnedPromise = testingFavoriteRepository.register({
    user_id: 100,
    shop_id: 100,
  });

  expect(returnedPromise).toEqual(Promise.resolve());

  await returnedPromise
    .then(res => expect(res).toBeNull);
});

test('test delete', async () => {
  const returnedPromise = testingFavoriteRepository.delete(100, 100);

  expect(returnedPromise).toEqual(Promise.resolve());

  await returnedPromise
    .then(res => expect(res).toBeNull);
});