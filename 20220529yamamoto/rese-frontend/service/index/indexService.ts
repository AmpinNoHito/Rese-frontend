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
    const user = $accessor.user as user;
    try {
      const shopResponse = await this.shopRepository.index();
      console.log(shopResponse);
      let favoriteShopIds: number[] = [];
      if ($accessor.loggedIn) {  // ログインしている場合はお気に入りのデータも取得
        const favoriteShopResponse = await this.shopRepository.getFavoriteShops(user.id);
        favoriteShopIds = favoriteShopResponse.ids;
      }
      return {
        shops: shopResponse.shops,
        regions: shopResponse.regionIds,
        genres: shopResponse.genreIds,
        favoriteShopIds: favoriteShopIds,
        searchResults: shopResponse.shops,
        userId: user.id ?? 0,
      }
    } catch (error: any) {
      throw error;
    }
  }
  
  async toggleFavorite(favoriteShopIds: number[], selectedShopId: number, userId: number): Promise<number[]> {
    const ch = favoriteShopIds.includes(selectedShopId);
    if (ch) { //店舗が既にお気に入りに追加されている場合は削除
      try {
        favoriteShopIds = favoriteShopIds.filter(favoriteShopId => favoriteShopId !== selectedShopId);
        await this.favoriteRepository.delete(userId, selectedShopId);
        } catch (error: any) {
          favoriteShopIds.push(selectedShopId);
          throw error;
        }
      }
    else {  //店舗がまだお気に入りに追加されていない場合は追加
      try {
        favoriteShopIds.push(selectedShopId);
        await this.favoriteRepository.register({
          user_id: userId,
          shop_id: selectedShopId,
        });
      } catch (error: any) {
        favoriteShopIds = favoriteShopIds.filter(favoriteShopId => favoriteShopId !== selectedShopId);
        throw error;
      }
    }
    return favoriteShopIds;
  };

  

  searchShops(regionId: (number | undefined), genreId: (number | undefined), searchWord: (string | undefined), shopList: shop[]): shop[] {
    /* 検索ワード等がない場合は店舗一覧を返す */
    if (!regionId && !genreId && !searchWord) {
      return shopList;
    } 

    let searchResults: shop[] = [];
    
    /* 地域で絞り込み */
    if (regionId) {
      searchResults = shopList.filter(shop => shop.region.id === regionId);
    }
    
    /* ジャンルで絞り込み */
    if (genreId) {
      searchResults = (searchResults.length) ? 
      searchResults.filter(shop => shop.genre.id === genreId) : // 地域ですでに絞り込まれている場合
      shopList.filter(shop => shop.genre.id === genreId); // まだ絞り込まれていない場合
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