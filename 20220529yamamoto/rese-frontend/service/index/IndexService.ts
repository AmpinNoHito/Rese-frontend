import IndexServiceInterface from "./IndexServiceInterface";
import ShopRepositoryInterface from "~/repository/shop/ShopRepositoryInterface";
import FavoriteRepositoryInterface from "~/repository/favorite/FavoriteRepositoryInterface";
import { Shop } from "~/types/api";
import { IndexInitData } from "~/types/pageData";
import { FavoriteRequest } from "~/types/axiosRequest";
import { ShopCollectionResponse } from "~/types/axiosResponse";

export default class IndexService implements IndexServiceInterface {
  readonly shopRepository: ShopRepositoryInterface;
  readonly favoriteRepository: FavoriteRepositoryInterface;

  constructor(shopRepository: ShopRepositoryInterface, favoriteRepository: FavoriteRepositoryInterface) {
    this.shopRepository = shopRepository;
    this.favoriteRepository = favoriteRepository;
  }

  async getData(userId: number): Promise<IndexInitData> {
    const shopPromise = this.shopRepository.index();
    let res: ShopCollectionResponse[] | ShopCollectionResponse;
    let ShopResponse: ShopCollectionResponse['data']['data'];
    let favoriteResponse: ShopCollectionResponse['data']['data'] | undefined;

    if (userId) {  // ログインしている場合はお気に入りのデータを含めて取得
      const favoritePromise = this.shopRepository.getFavoriteShops(userId);
      res = await Promise.all([shopPromise, favoritePromise])
        .catch(error => {
          throw error;
        });
      
      ShopResponse = res[0].data.data;
      favoriteResponse = res[1].data.data;
    } else {  // ログインしていない場合は店舗データのみ取得
      res = await shopPromise
        .catch(error => {
          throw error;
        });

      ShopResponse = res.data.data;
      favoriteResponse = undefined;
    }

    return  {
      shops: ShopResponse.shops,
      regionIds: ShopResponse.regionIds,
      genreIds: ShopResponse.genreIds,
      favoriteShopIds: (favoriteResponse) ? favoriteResponse.shopIds : [],
      searchResults: ShopResponse.shops,
      userId: userId,
    }
  }
  
  async toggleFavorite(favoriteShopIds: number[], selectedShopId: number, userId: number): Promise<number[]> {
    const ch = favoriteShopIds.includes(selectedShopId);
    if (ch) { //店舗が既にお気に入りに追加されている場合は削除
      favoriteShopIds = favoriteShopIds.filter(favoriteShopId => favoriteShopId !== selectedShopId);
      await this.favoriteRepository.delete(userId, selectedShopId)
        .catch(error => {
          favoriteShopIds.push(selectedShopId);
          throw error;
        });
    } else {  //店舗がまだお気に入りに追加されていない場合は追加
      const sendData: FavoriteRequest = {user_id: userId, shop_id: selectedShopId};
      favoriteShopIds.push(selectedShopId);
      await this.favoriteRepository.register(sendData)
      .catch(error => {
        favoriteShopIds = favoriteShopIds.filter(favoriteShopId => favoriteShopId !== selectedShopId);
          throw error;
        });
    }
    return favoriteShopIds;
  };

  

  searchShops(regionId: string, genreId: string, searchWord: string, shopList: Shop[]): Shop[] {
    /* 検索ワード等がない場合は店舗一覧を返す */
    if (!regionId && !genreId && !searchWord) {
      return shopList;
    } 

    let searchResults: Shop[] = [];
    
    /* 地域で絞り込み */
    if (regionId) {
      searchResults = shopList.filter(shop => shop.region.id === +regionId);
    }
    
    /* ジャンルで絞り込み */
    if (genreId) {
      searchResults = (searchResults.length) ? 
      searchResults.filter(shop => shop.genre.id === +genreId) : // 地域ですでに絞り込まれている場合
      shopList.filter(shop => shop.genre.id === +genreId); // まだ絞り込まれていない場合
    }
    
    /* 検索ワードをもとに絞り込み */
    if (searchWord) {
      searchResults = (searchResults.length) ? 
      searchResults.filter(shop => ~shop.name.toUpperCase().indexOf(searchWord.toUpperCase())) : // 地域、ジャンルですでに絞り込まれている場合
      shopList.filter(shop => ~shop.name.toUpperCase().indexOf(searchWord.toUpperCase())); // まだ絞り込まれていない場合
    }

    return searchResults;
  }
}