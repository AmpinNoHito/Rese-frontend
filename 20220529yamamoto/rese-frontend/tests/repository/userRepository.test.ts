import { NuxtAxiosInstance } from '@nuxtjs/axios';
import axios from 'axios';
import userRepositoryInterface from '~/repository/user/userRepositoryInterface';
import userRepository from "~/repository/user/userRepository";
import { user } from "~/types/api";

/* モック化されたaxiosの戻り値の型 */
interface mockedAxiosResponse {
  data: user | {token: string},
}

/* axiosをモック化 */
let mockedAxiosResponse: mockedAxiosResponse;
let sw: boolean = true;
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve(mockedAxiosResponse)),
  post: jest.fn(() => Promise.resolve(sw ? null : mockedAxiosResponse)),
}));

const testingUserRepository: userRepositoryInterface = new userRepository(axios as NuxtAxiosInstance);

/* ユーザーデータのモックを定義 */
const userMock: user = {
  id: 100,
  group: 1,
  name: 'test',
  email: 'test@ex.com',
};

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
  mockedAxiosResponse = {data: {token: 'test'}};

  const returnedPromise = testingUserRepository.login({
    email: 'test@ex.com',
    password: 'password'
  });

  expect(returnedPromise).toEqual(Promise.resolve(mockedAxiosResponse));

  await returnedPromise
    .then(res => expect(res).toEqual(mockedAxiosResponse));
});

test('test getUser', async () => {
  mockedAxiosResponse = {data: userMock};

  const returnedPromise = testingUserRepository.getUser('token');

  expect(returnedPromise).toEqual(Promise.resolve(mockedAxiosResponse));

  await returnedPromise
    .then(res => expect(res).toEqual(mockedAxiosResponse));
});