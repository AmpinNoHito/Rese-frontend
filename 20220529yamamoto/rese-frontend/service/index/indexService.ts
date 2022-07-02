import indexServiceInterface from "./indexServiceInterface";
import shopRepositoryInterface from "~/repository/shop/shopRepositoryInterface";
import favoriteRepositoryInterface from "~/repository/favorite/favoriteRepositoryInterface";
import { shop, user } from "~/types/api";
import { NuxtAppOptions } from "@nuxt/types";
import { indexInitData } from "~/types/pageInitData";

export default class indexService implements indexServiceInterface {
  readonly shopRepository: shopRepositoryInterface;
  readonly favoriteRepository: favoriteRepositoryInterface;

  constructor(shopRepository: shopRepositoryInterface, favoriteRepository: favoriteRepositoryInterface) {
    this.shopRepository = shopRepository;
    this.favoriteRepository = favoriteRepository;
  }

  async getData({ $accessor }: NuxtAppOptions): Promise<indexInitData> {
    const data = {} as indexInitData;
    /* 店舗一覧、検索結果の初期値をセット */
    data.shops = data.searchResults = await this.shopRepository.index();

    /* 店舗が存在する地域のId一覧を格納 */
    data.regions = [...new Set(data.shops.map(shop => shop.region.id))];

    /* 店舗が存在するジャンルのId一覧を格納 */
    data.genres = [...new Set(data.shops.map(shop => shop.genre.id))];

    /* ユーザーIdを格納 */
    const user = $accessor.user as user;
    data.userId = user.id ?? 0;
    
    /* ログイン中であればお気に入り店舗のデータを取得 */
    data.favoriteShopsId = [];
    if ($accessor.loggedIn) {
      const favoriteShops = await this.shopRepository.getFavoriteShops(user.id);
      
      /* お気に入りが店舗があればidを取得し格納 */
      if (favoriteShops) {
        favoriteShops.forEach(favoriteShop => data.favoriteShopsId.push(favoriteShop.id));
      }
    }

    return data;
  }

  async toggleFavorite(favoriteShopsId: number[], selectedShopId: number, userId: number): Promise<number[]> {
    const ch = favoriteShopsId.includes(selectedShopId);
    if (ch) { //店舗が既にお気に入りに追加されている場合は削除
      try {
        favoriteShopsId = favoriteShopsId.filter(favoriteShopId => favoriteShopId !== selectedShopId);
        await this.favoriteRepository.delete(userId, selectedShopId);
        } catch (error: any) {
          favoriteShopsId.push(selectedShopId);
          throw error;
        }
      }
    else {  //店舗がまだお気に入りに追加されていない場合は追加
      try {
        favoriteShopsId.push(selectedShopId);
        await this.favoriteRepository.register({
          user_id: userId,
          shop_id: selectedShopId,
        });
      } catch (error: any) {
        favoriteShopsId = favoriteShopsId.filter(favoriteShopId => favoriteShopId !== selectedShopId);
        throw error;
      }
    }
    return favoriteShopsId;
  };

  searchShops(regionId: (number | undefined), genreId: (number | undefined), searchWord: (string | undefined), shopList: shop[]): shop[] {
    /* 検索ワード等がない場合は店舗一覧を返す */
    if (!regionId && !genreId && !searchWord) {
      return shopList;
    } 

    let searchResults: shop[] = [];
    
    /* 地域で絞り込み */
    if (regionId) {
      searchResults = shopList.filter(shop => shop.region_id === regionId);
    }
    
    /* ジャンルで絞り込み */
    if (genreId) {
      searchResults = (searchResults.length) ? 
      searchResults.filter(shop => shop.genre_id === genreId) : // 地域ですでに絞り込まれている場合
      shopList.filter(shop => shop.genre_id === genreId); // まだ絞り込まれていない場合
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