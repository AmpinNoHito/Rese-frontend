import { NuxtAxiosInstance } from "@nuxtjs/axios";
import axios from "axios";
import ShopRepository from "~/repository/shop/ShopRepository";
import ShopRepositoryInterface from "~/repository/shop/ShopRepositoryInterface";
import AdminIndexService from "~/service/adminIndex/AdminIndexService";
import AdminIndexServiceInterface from "~/service/adminIndex/AdminIndexServiceInterface";
import { NewShop } from "~/types/api";
import { ShopRequest } from "~/types/axiosRequest";
import { AdminIndexInitData } from "~/types/pageData";
import { SHOP, SHOP_COLLECTION_RESPONSE } from "../consts";

/* shopRepositoryのインスタンスを作成、必要なメソッドをモック化 */
const shopRepositoryInstance: ShopRepositoryInterface = new ShopRepository(axios as NuxtAxiosInstance);
const mockRegister = jest.spyOn(shopRepositoryInstance, 'register')
  .mockImplementation((sendData: ShopRequest) => Promise.resolve());
const mockGetByRepresentativeId = jest.spyOn(shopRepositoryInstance, 'getByRepresentativeId')
  .mockImplementation((representativeId: number) => Promise.resolve(SHOP_COLLECTION_RESPONSE));

/* window.alertをモック化 */
const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

/* テスト用のadminIndexServiceインスタンスを作成 */
const testingAdminIndexService: AdminIndexServiceInterface = new AdminIndexService(shopRepositoryInstance);

test('test getData', async () => {
  const expectedRes: AdminIndexInitData = {
    shops: [SHOP],
    newShop: {
      representative_id: 100,
      name: '',
      description: '',
      region_id: 0,
      genre_id: 0,
    },
  };

  const res = await testingAdminIndexService.getData(100);

  expect(mockGetByRepresentativeId).toBeCalledWith(100);
  expect(res).toEqual(expectedRes);
});

test('test registerShop', async () => {
  mockGetByRepresentativeId.mockClear();
  const sendData: NewShop = {
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