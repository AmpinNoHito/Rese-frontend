import { NuxtAxiosInstance } from '@nuxtjs/axios';
import axios from 'axios';
import reservationRepositoryInterface from '~/repository/reservation/reservationRepositoryInterface';
import reservationRepository from "~/repository/reservation/reservationRepository";
import { reservation } from "~/types/api";

/* モック化されたaxiosの戻り値の型 */
interface mockedAxiosResponse {
  data: reservation | reservation[],
}

/* axiosをモック化 */
let mockedAxiosResponse: mockedAxiosResponse;
let sw: boolean = false;
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve(mockedAxiosResponse)),
  post: jest.fn(() => Promise.resolve(sw ? null : mockedAxiosResponse)),
  put: jest.fn(() => Promise.resolve()),
  delete: jest.fn(() => Promise.resolve()),
}));

const testingReservationRepository: reservationRepositoryInterface = new reservationRepository(axios as NuxtAxiosInstance);

/* 予約データのモックを定義 */
const reservationMock: reservation = {
  id: 100,
  user: {
    id: 100,
    name: 'testUser',
  },
  shop: {
    id: 100,
    representative_id: 100,
    name: 'testShop',
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
    courses: [],
  },
  date: '2023-01-01',
  time: '10:00',
  number: '1人',
  amount: 10000,
  visit_completed: 1,
  advance_payment: 1,
};

/* 以下、各メソッドのテスト */
test('test register', async () => {
  mockedAxiosResponse = {data: reservationMock};
  const returnedPromise = testingReservationRepository.register({
    user_id: 100,
    shop_id: 100,
    datetime: '2023-01-01 10:00:00',
    number: 1,
  });

  expect(returnedPromise).toEqual(Promise.resolve(mockedAxiosResponse));

  await returnedPromise
    .then(res => expect(res).toEqual(mockedAxiosResponse));
});

test('test getById', async () => {
  mockedAxiosResponse = {data: reservationMock};
  const returnedPromise = testingReservationRepository.getById(100);

  expect(returnedPromise).toEqual(Promise.resolve(mockedAxiosResponse));

  await returnedPromise
    .then(res => expect(res).toEqual(mockedAxiosResponse));
});

test('test getByUserId', async () => {
  /* reservationMockを複製し、Idを変更したものを用意 */
  const reservationMock2 = {} as reservation;
  Object.assign(reservationMock2, reservationMock);
  reservationMock2.id = 200;
  
  mockedAxiosResponse = {data: [reservationMock, reservationMock2]}

  const returnedPromise = testingReservationRepository.getByUserId(100);
  
  expect(returnedPromise).toEqual(Promise.resolve(mockedAxiosResponse));

  await returnedPromise
    .then(res => expect(res).toEqual(mockedAxiosResponse));
});

test('test update', async () => {
  const returnedPromise = testingReservationRepository.update(100, {
    user_id: 200,
    shop_id: 200,
    datetime: '2023-01-01 10:00:00',
    number: 2,
  });

  expect(returnedPromise).toEqual(Promise.resolve());

  await returnedPromise
    .then(res => expect(res).toBeNull);
});

test('test delete', async () => {
  const returnedPromise = testingReservationRepository.delete(100);

  expect(returnedPromise).toEqual(Promise.resolve());

  await returnedPromise
    .then(res => expect(res).toBeNull);
});


test('test pay', async () => {
  sw = true;  // postメソッドの戻り値をnullに変更
  const returnedPromise = testingReservationRepository.pay(100, {
    amount: 10000,
    source: 'tokenMock',
  });

  expect(returnedPromise).toEqual(Promise.resolve());

  await returnedPromise
    .then(res => expect(res).toBeNull);
});

test('test visit', async () => {
  const returnedPromise = testingReservationRepository.visit(100);

  expect(returnedPromise).toEqual(Promise.resolve());

  await returnedPromise
    .then(res => expect(res).toBeNull);
});