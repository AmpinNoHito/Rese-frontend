import indexServiceInterface from "./indexServiceInterface";
import shopRepositoryInterface from "~/repository/shop/shopRepositoryInterface";
import favoriteRepositoryInterface from "~/repository/favorite/favoriteRepositoryInterface";
import { shop, user } from "~/types/api";
import { NuxtAppOptions } from "@nuxt/types";
import { indexInitData } from "~/types/pageData";

export default class indexService implements indexServiceInterface {
  readonly shopRepository: shopRepositoryInterface;
  readonly favoriteRepository: favoriteRepositoryInterface;

  constructor(shopRepository: shopRepositoryInterface, favoriteRepository: favoriteRepositoryInterface) {
    this.shopRepository = shopRepository;
    this.favoriteRepository = favoriteRepository;
  }

  async getData({ $accessor }: NuxtAppOptions): Promise<indexInitData> {
    const shopPromise = this.shopRepository.index();
    if ($accessor.loggedIn) {  // ログインしている場合はお気に入りのデータも取得
      const favoritePromise = this.shopRepository.getFavoriteShops($accessor.user.id);
      const res = await Promise.all([shopPromise, favoritePromise])
        .catch(error => {
          throw error;
        });
      
      const shopResponse = res[0].data.data;
      const favoriteResponse = res[1].data.data;

      return  {
        shops: shopResponse.shops,
        regionIds: shopResponse.regionIds,
        genreIds: shopResponse.genreIds,
        favoriteShopIds: favoriteResponse.shopIds,
        searchResults: shopResponse.shops,
        userId: $accessor.user.id,
      }
    } else {  // ログインしていない場合は店舗データのみ取得
      const res = await shopPromise
        .catch(error => {
          throw error;
        });

      const shopResponse = res.data.data;

      return {
        shops: shopResponse.shops,
        regionIds: shopResponse.regionIds,
        genreIds: shopResponse.genreIds,
        favoriteShopIds: [],
        searchResults: shopResponse.shops,
        userId: $accessor.user.id,
      }
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
      const sendData = {user_id: userId, shop_id: selectedShopId};
      favoriteShopIds.push(selectedShopId);
      await this.favoriteRepository.register(sendData)
      .catch(error => {
        favoriteShopIds = favoriteShopIds.filter(favoriteShopId => favoriteShopId !== selectedShopId);
          throw error;
        });
    }
    return favoriteShopIds;
  };

  

  searchShops(regionId: string, genreId: string, searchWord: string, shopList: shop[]): shop[] {
    /* 検索ワード等がない場合は店舗一覧を返す */
    if (!regionId && !genreId && !searchWord) {
      return shopList;
    } 

    let searchResults: shop[] = [];
    
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