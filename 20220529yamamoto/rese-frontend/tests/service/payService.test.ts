import { NuxtAxiosInstance } from "@nuxtjs/axios";
import axios from "axios";
import reservationRepository from "~/repository/reservation/reservationRepository";
import payService from "~/service/pay/payService";
import { payRequest } from "~/types/axiosRequest";

/* reservationRepositoryのインスタンスを作成、payメソッドをモック化 */
const reservationRepositoryInstance = new reservationRepository(axios as NuxtAxiosInstance);
const mockPay = jest.spyOn(reservationRepositoryInstance, 'pay')
  .mockImplementation((id: number, sendData: payRequest) => Promise.resolve());

/* window.alertをモック化 */
const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

/* テスト用のpayServiceインスタンスを作成 */
const testingPayService = new payService(reservationRepositoryInstance);

test('test pay', async () => {
  const res = await testingPayService.pay(100, 'tokenId', 10000);

  expect(mockPay).toBeCalledWith(100, {
    amount: 10000,
    source: 'tokenId',
  });
  expect(mockAlert).toBeCalledWith('支払い処理が正常に完了しました。\n\nマイページに遷移します。')
  expect(res).toBeUndefined();
});
