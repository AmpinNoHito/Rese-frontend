import { NuxtAxiosInstance } from '@nuxtjs/axios';
import axios from 'axios';
import UserRepositoryInterface from '~/repository/user/UserRepositoryInterface';
import UserRepository from "~/repository/user/UserRepository";
import { USER } from '../consts';
import { tokenResponse, UserResponse } from '~/types/axiosResponse';

/* モック化されたaxiosの戻り値の型 */
type mockAxiosResponse = UserResponse | tokenResponse;

/* axiosをモック化 */
let mockAxiosResponse: mockAxiosResponse;
let sw: boolean = true;
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve(mockAxiosResponse)),
  post: jest.fn(() => Promise.resolve(sw ? null : mockAxiosResponse)),
}));

const testingUserRepository: UserRepositoryInterface = new UserRepository(axios as NuxtAxiosInstance);

test('test register', async () => {
  const returnedPromise = testingUserRepository.register({
    name: 'test',
    email: 'test@ex.com',
    password: 'password',
  });

  expect(returnedPromise).toEqual(Promise.resolve());

  await returnedPromise
    .then(res => expect(res).toBeNull);
});

test('test registerRepresentative', async () => {
  const returnedPromise = testingUserRepository.registerRepresentative({
    name: 'test',
    email: 'test@ex.com',
    password: 'password',
  });

  expect(returnedPromise).toEqual(Promise.resolve());

  await returnedPromise
    .then(res => expect(res).toBeNull);
});

test('test logout', async () => {
  const returnedPromise = testingUserRepository.logout();

  expect(returnedPromise).toEqual(Promise.resolve());

  await returnedPromise
    .then(res => expect(res).toBeNull);
});

test('test login', async () => {
  sw = false;  // モック化されたaxiosの戻り値を変更
  mockAxiosResponse = {data: {token: 'test'}};

  const returnedPromise = testingUserRepository.login({
    email: 'test@ex.com',
    password: 'password'
  });

  expect(returnedPromise).toEqual(Promise.resolve(mockAxiosResponse));

  await returnedPromise
    .then(res => expect(res.data.token).toEqual('test'));
});

test('test getUser', async () => {
  mockAxiosResponse = {
    data: {
      user: USER,
    },
  };

  const returnedPromise = testingUserRepository.getUser('token');

  expect(returnedPromise).toEqual(Promise.resolve(mockAxiosResponse));

  await returnedPromise
    .then(res => expect(res.data.user).toEqual(USER));
});