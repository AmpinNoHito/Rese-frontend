import { shop } from "~/types/api";
import { NuxtAppOptions } from '@nuxt/types';
import { indexInitData } from "~/types/pageData";

export default interface indexServiceInterface {
  getData({ $accessor } :NuxtAppOptions): Promise<indexInitData>;
  toggleFavorite(favoriteShopsId: number[], selectedShopId: number, userId: number): Promise<number[]>;
  searchShops(regionId: string, genreId: string, searchWord: string, shopList: shop[]): shop[]; 
}