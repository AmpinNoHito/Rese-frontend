import { NuxtAxiosInstance } from '@nuxtjs/axios';
import axios from 'axios';
import courseRepositoryInterface from '~/repository/course/courseRepositoryInterface';
import courseRepository from '~/repository/course/courseRepository';

/* axiosをモック化 */
jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve()),
  delete: jest.fn(() => Promise.resolve()),
}));

const testingCourseRepository: courseRepositoryInterface = new courseRepository(axios as NuxtAxiosInstance);

test('test register', async () => {
  const returnedPromise = testingCourseRepository.register({
    shop_id: 100,
    name: 'test',
    price: 10000,
    description: 'test',
  });

  expect(returnedPromise).toEqual(Promise.resolve());

  await returnedPromise
    .then(res => expect(res).toBeNull);
});

test('test delete', async () => {
  const returnedPromise = testingCourseRepository.delete(100);

  expect(returnedPromise).toEqual(Promise.resolve());

  await returnedPromise
    .then(res => expect(res).toBeNull);
});