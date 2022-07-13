import { NuxtAxiosInstance } from '@nuxtjs/axios';
import axios from 'axios';
import reviewRepositoryInterface from '~/repository/review/reviewRepositoryInterface';
import reviewRepository from '~/repository/review/reviewRepository';

/* axiosをモック化 */
jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve()),
  put: jest.fn(() => Promise.resolve()),
  delete: jest.fn(() => Promise.resolve()),
}));

const testingReviewRepository: reviewRepositoryInterface = new reviewRepository(axios as NuxtAxiosInstance);

test('test register', async () => {
  const returnedPromise = testingReviewRepository.register({
    reservation_id: 100,
    rate: 5,
    title: 'test',
    content: 'test',
  });

  expect(returnedPromise).toEqual(Promise.resolve());

  await returnedPromise
    .then(res => expect(res).toBeNull);
});

test('test update', async () => {
  const returnedPromise = testingReviewRepository.update(100, {
    reservation_id: 100,
    rate: 1,
    title: 'test',
    content: 'test',
  });

  expect(returnedPromise).toEqual(Promise.resolve());

  await returnedPromise
    .then(res => expect(res).toBeNull);
});

test('test delete', async () => {
  const returnedPromise = testingReviewRepository.delete(100);

  expect(returnedPromise).toEqual(Promise.resolve());

  await returnedPromise
    .then(res => expect(res).toBeNull);
});