import { NuxtAxiosInstance } from "@nuxtjs/axios";
import axios from "axios";
import FavoriteRepository from "~/repository/favorite/FavoriteRepository";
import ShopRepository from "~/repository/shop/ShopRepository";
import IndexService from "~/service/index/IndexService";
import IndexServiceInterface from "~/service/index/IndexServiceInterface";
import { FavoriteRequest } from "~/types/axiosRequest";
import { IndexInitData } from "~/types/pageData";
import { SHOP, SHOP_COLLECTION_RESPONSE } from "../consts";

/* shopRepositoryのインスタンスを作成、必要なメソッドをモック化 */
const shopRepositoryInstance = new ShopRepository(axios as NuxtAxiosInstance);
const mockShopIndex = jest.spyOn(shopRepositoryInstance, 'index')
  .mockImplementation(() => Promise.resolve(SHOP_COLLECTION_RESPONSE));
const mockGetFavoriteShops = jest.spyOn(shopRepositoryInstance, 'getFavoriteShops')
  .mockImplementation((userId: number) => Promise.resolve(SHOP_COLLECTION_RESPONSE));

/* favoriteRepositoryのインスタンスを作成、必要なメソッドをモック化 */
const favoriteRepositoryInstance = new FavoriteRepository(axios as NuxtAxiosInstance);
const mockRegisterFavorite = jest.spyOn(favoriteRepositoryInstance, 'register')
  .mockImplementation((sendData: FavoriteRequest) => Promise.resolve());
const mockDeleteFavorite = jest.spyOn(favoriteRepositoryInstance, 'delete')
  .mockImplementation((userId: number, shopId: number) => Promise.resolve());

/* テスト用のindexServiceインスタンスを作成 */
const testingIndexService: IndexServiceInterface = new IndexService(shopRepositoryInstance, favoriteRepositoryInstance);

describe('test getData', () => {
  const expectedRes: IndexInitData = {
    shops: [SHOP],
    regionIds: [SHOP.region.id],
    genreIds: [SHOP.genre.id],
    favoriteShopIds: [SHOP.id],
    searchResults: [SHOP],
    userId: 100,
  }

  test('get data being logged in', async () => {
    const res = await testingIndexService.getData(100);

    expect(mockShopIndex).toBeCalled();
    expect(mockGetFavoriteShops).toBeCalledWith(100);
    expect(res).toEqual(expectedRes);
  });

  test('get data being logged out', async () => {
    mockShopIndex.mockClear();
    mockGetFavoriteShops.mockClear();
    expectedRes.favoriteShopIds = [];
    expectedRes.userId = 0;
    const res = await testingIndexService.getData(0);

    expect(mockShopIndex).toBeCalled();
    expect(mockGetFavoriteShops).not.toBeCalled();
    expect(res).toEqual(expectedRes);
  });
});

describe('test toggleFavorite', () => {
  test('register favorite', async () => {
    const res = await testingIndexService.toggleFavorite([200], 100, 100);
    expect(mockRegisterFavorite).toBeCalledWith({user_id: 100, shop_id: 100});
    expect(res).toEqual([200, 100]);
  });

  test('delete favorite', async () => {
    const res = await testingIndexService.toggleFavorite([100], 100, 100);
    expect(mockDeleteFavorite).toBeCalledWith(100, 100);
    expect(res).toEqual([]);
  });
});

describe('test searchShops', () => {
  test('search by regionId', () => {
    const res = testingIndexService.searchShops('100', '', '', [SHOP]);
    expect(res).toEqual([SHOP]);
  });

  test('search by genreId', () => {
    const res = testingIndexService.searchShops('', '100', '', [SHOP]);
    expect(res).toEqual([SHOP]);
  });

  test('search by searchWord', () => {
    const res = testingIndexService.searchShops('', '', 'test', [SHOP]);
    expect(res).toEqual([SHOP]);
  })
  
  test('search by all', () => {
    const res = testingIndexService.searchShops('100', '100', 'test', [SHOP]);
    expect(res).toEqual([SHOP]);
  });
});