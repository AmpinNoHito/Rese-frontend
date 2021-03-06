import { NuxtAxiosInstance } from '@nuxtjs/axios';
import axios from 'axios';
import ReservationRepositoryInterface from '~/repository/reservation/ReservationRepositoryInterface';
import ReservationRepository from "~/repository/reservation/ReservationRepository";
import { HISTORY, NEW_RESERVATION_RESPONSE, RESERVATION, RESERVATION_COLLECTION_RESPONSE, RESERVATION_RESPONSE } from '../consts';
import { NewReservationResponse, ReservationCollectionResponse, ReservationResponse } from '~/types/axiosResponse';

/* モック化されたaxiosの戻り値の型 */
type MockAxiosResponse = ReservationResponse | NewReservationResponse | ReservationCollectionResponse;

/* axiosをモック化 */
let mockAxiosResponse: MockAxiosResponse;
let sw: boolean = false;
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve(mockAxiosResponse)),
  post: jest.fn(() => Promise.resolve(sw ? null : mockAxiosResponse)),
  put: jest.fn(() => Promise.resolve()),
  delete: jest.fn(() => Promise.resolve()),
}));

const testingReservationRepository: ReservationRepositoryInterface = new ReservationRepository(axios as NuxtAxiosInstance);

/* 以下、各メソッドのテスト */
test('test register', async () => {
  mockAxiosResponse = NEW_RESERVATION_RESPONSE;

  const returnedPromise = testingReservationRepository.register({
    user_id: 100,
    shop_id: 100,
    datetime: '2023-01-01 10:00:00',
    number: 1,
  });

  expect(returnedPromise).toEqual(Promise.resolve(mockAxiosResponse));

  const res = await returnedPromise;
  expect(res.data.newData).toEqual(RESERVATION);
});

test('test getById', async () => {
  mockAxiosResponse = RESERVATION_RESPONSE;
  const returnedPromise = testingReservationRepository.getById(100);

  expect(returnedPromise).toEqual(Promise.resolve(mockAxiosResponse));

  const res = await returnedPromise;
  expect(res.data.data).toEqual(RESERVATION);
});

test('test getByUserId', async () => {
  mockAxiosResponse = RESERVATION_COLLECTION_RESPONSE;

  const returnedPromise = testingReservationRepository.getByUserId(100);
  
  expect(returnedPromise).toEqual(Promise.resolve(mockAxiosResponse));

  const res = await returnedPromise;
  expect(res.data.data.reservations[0]).toEqual(RESERVATION);
  expect(res.data.data.histories[0]).toEqual(HISTORY);
});

test('test update', async () => {
  const returnedPromise = testingReservationRepository.update(100, {
    user_id: 200,
    shop_id: 200,
    datetime: '2023-01-01 10:00:00',
    number: 2,
  });

  expect(returnedPromise).toEqual(Promise.resolve());

  const res = await returnedPromise;
  expect(res).toBeNull;
});

test('test delete', async () => {
  const returnedPromise = testingReservationRepository.delete(100);

  expect(returnedPromise).toEqual(Promise.resolve());

  const res = await returnedPromise;
  expect(res).toBeNull;
});


test('test pay', async () => {
  sw = true;  // postメソッドの戻り値をnullに変更
  const returnedPromise = testingReservationRepository.pay(100, {
    amount: 10000,
    source: 'tokenMock',
  });

  expect(returnedPromise).toEqual(Promise.resolve());

  const res = await returnedPromise;
  expect(res).toBeNull;
});

test('test visit', async () => {
  const returnedPromise = testingReservationRepository.visit(100);

  expect(returnedPromise).toEqual(Promise.resolve());

  const res = await returnedPromise;
  expect(res).toBeNull;
});