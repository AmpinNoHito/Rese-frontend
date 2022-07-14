import { NuxtAxiosInstance } from "@nuxtjs/axios";
import axios from "axios";
import ReservationRepository from "~/repository/reservation/ReservationRepository";
import PayService from "~/service/pay/PayService";
import { PayRequest } from "~/types/axiosRequest";
import { PayInitData } from "~/types/pageData";
import { RESERVATION, RESERVATION_RESPONSE } from "../consts";

/* reservationRepositoryのインスタンスを作成、必要なメソッドをモック化 */
const reservationRepositoryInstance = new ReservationRepository(axios as NuxtAxiosInstance);
const mockGetById = jest.spyOn(reservationRepositoryInstance, 'getById')
  .mockImplementation((reservationId: number) => Promise.resolve(RESERVATION_RESPONSE));
const mockPay = jest.spyOn(reservationRepositoryInstance, 'pay')
  .mockImplementation((id: number, sendData: PayRequest) => Promise.resolve());

/* window.alertをモック化 */
const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

/* テスト用のpayServiceインスタンスを作成 */
const testingPayService = new PayService(reservationRepositoryInstance);

test('test getData', async () => {
  const expectedRes: PayInitData = {
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
