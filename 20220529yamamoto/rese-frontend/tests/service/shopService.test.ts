import { NuxtAxiosInstance } from "@nuxtjs/axios";
import axios from "axios";
import reservationRepository from "~/repository/reservation/reservationRepository";
import shopRepository from "~/repository/shop/shopRepository";
import { COURSE, NEW_RESERVATION_RESPONSE, SHOP, SHOP_RESPONSE } from "../consts";
import shopService from "~/service/shop/shopService";
import { newReservation } from "~/types/api";
import { reservationRequest } from "~/types/axiosRequest";
import { shopInitData, shopQuery } from "~/types/pageData";

/* shopRepositoryのインスタンスを作成、getByIdメソッドをモック化 */
const shopRepositoryInstance = new shopRepository(axios as NuxtAxiosInstance);
const mockGetShopById = jest.spyOn(shopRepositoryInstance, 'getById')
  .mockImplementation((id: number) => Promise.resolve(SHOP_RESPONSE));

/* reservationRepositoryのインスタンスを作成、registerメソッドをモック化 */
const reservationRepositoryInstance = new reservationRepository(axios as NuxtAxiosInstance);
const mockRegisterReservation = jest.spyOn(reservationRepositoryInstance, 'register')
  .mockImplementation((sendData: reservationRequest) => Promise.resolve(NEW_RESERVATION_RESPONSE));

/* テスト用のshopServiceインスタンスを作成 */
const testingShopService = new shopService(shopRepositoryInstance, reservationRepositoryInstance);

test('test getData', async () => {
  const shopQuery: shopQuery = {
    dt: '2023-01-01',
    tm: '10:00',
    nm: '1人',
    sc: '0',
  };
  const expectedRes: shopInitData = {
    shop: SHOP,
    newReservation: {
      date: '2023-01-01',
      time: '10:00',
      number: '1人',
      selectedCourseIndex: 0,
      selectedReservationId: 0,
      courses: SHOP.courses,
    }
  };

  const res = await testingShopService.getData(100, '2022-12-31', shopQuery);

  expect(mockGetShopById).toBeCalledWith(100);
  expect(res).toEqual(expectedRes);
});

test('test registerReservation', async () => {
  const newReservation: newReservation = {
    courses: [COURSE],
    name: 'test',
    date: '2023-01-01',
    time: '10:00',
    number: '1人',
    selectedReservationId: 0,
    selectedCourseIndex: 0,
  }

  const res = await testingShopService.registerReservation(newReservation, 100, 100);

  expect(mockRegisterReservation).toBeCalledWith({
    user_id: 100,
    shop_id: 100,
    course_id: 100,
    datetime: '2023-01-01 10:00',
    number: 1,
  })
  expect(res.path).toEqual('/done');
  expect(res.query).toEqual({rs: '100'});
});