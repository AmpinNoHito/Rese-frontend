import { NuxtAxiosInstance } from "@nuxtjs/axios";
import axios from "axios";
import reservationRepository from "~/repository/reservation/reservationRepository";
import payService from "~/service/pay/payService";
import { payRequest } from "~/types/axiosRequest";
import { payInitData } from "~/types/pageData";
import { RESERVATION, RESERVATION_RESPONSE } from "../consts";

/* reservationRepositoryのインスタンスを作成、必要なメソッドをモック化 */
const reservationRepositoryInstance = new reservationRepository(axios as NuxtAxiosInstance);
const mockGetById = jest.spyOn(reservationRepositoryInstance, 'getById')
  .mockImplementation((reservationId: number) => Promise.resolve(RESERVATION_RESPONSE));
const mockPay = jest.spyOn(reservationRepositoryInstance, 'pay')
  .mockImplementation((id: number, sendData: payRequest) => Promise.resolve());

/* window.alertをモック化 */
const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

/* テスト用のpayServiceインスタンスを作成 */
const testingPayService = new payService(reservationRepositoryInstance);

test('test getData', async () => {
  const expectedRes: payInitData = {
    reservation: RESERVATION,
  };
  const res = await testingPayService.getData(100);

  expect(mockGetById).toBeCalledWith(100);
  expect(res).toEqual(expectedRes);
});

test('test pay', async () => {
  const res = await testingPayService.pay(100, 'tokenId', 10000);

  expect(mockPay).toBeCalledWith(100, {
    amount: 10000,
    source: 'tokenId',
  });
  expect(mockAlert).toBeCalledWith('支払い処理が正常に完了しました。\n\nマイページに遷移します。')
  expect(res).toBeUndefined();
});
