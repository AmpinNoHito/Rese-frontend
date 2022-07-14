import { NuxtAxiosInstance } from "@nuxtjs/axios";
import axios from "axios";
import shopRepository from "~/repository/shop/shopRepository";
import shopRepositoryInterface from "~/repository/shop/shopRepositoryInterface";
import adminIndexService from "~/service/adminIndex/adminIndexService";
import adminIndexServiceInterface from "~/service/adminIndex/adminIndexServiceInterface";
import { newShop } from "~/types/api";
import { shopRequest } from "~/types/axiosRequest";
import { SHOP, SHOP_COLLECTION_RESPONSE } from "../consts";

/* shopRepositoryのインスタンスを作成、必要なメソッドをモック化 */
const shopRepositoryInstance: shopRepositoryInterface = new shopRepository(axios as NuxtAxiosInstance);
const mockRegister = jest.spyOn(shopRepositoryInstance, 'register')
  .mockImplementation((sendData: shopRequest) => Promise.resolve());
const mockGetByRepresentativeId = jest.spyOn(shopRepositoryInstance, 'getByRepresentativeId')
  .mockImplementation((representativeId: number) => Promise.resolve(SHOP_COLLECTION_RESPONSE));

/* window.alertをモック化 */
const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

/* テスト用のadminIndexServiceインスタンスを作成 */
const testingAdminIndexService: adminIndexServiceInterface = new adminIndexService(shopRepositoryInstance);

test('test registerShop', async () => {
  const sendData: newShop = {
    name: 'test',
    representative_id: 100,
    region_id: 100,
    genre_id: 100,
    description: 'test',
    base64EncodedImage: 'test',
  };

  const res = await testingAdminIndexService.registerShop(sendData);

  expect(mockRegister).toBeCalledWith(sendData);
  expect(mockGetByRepresentativeId).toBeCalledWith(100);
  expect(mockAlert).toBeCalledWith('新規店舗が登録されました。');
  expect(res).toEqual([SHOP]);
});