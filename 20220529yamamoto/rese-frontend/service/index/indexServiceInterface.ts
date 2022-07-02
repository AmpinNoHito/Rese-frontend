import { shop } from "~/types/api";
import { NuxtAppOptions } from '@nuxt/types';
import { indexInitData } from "~/types/pageInitData";

export default interface indexServiceInterface {
  getData({ $accessor } :NuxtAppOptions): Promise<indexInitData>;
  toggleFavorite(favoriteShopsId: number[], selectedShopId: number, userId: number): Promise<number[]>;
  searchShops(regionId: (number | undefined), genreId: (number | undefined), searchWord: (string | undefined), shopList: shop[]): shop[]; 
}