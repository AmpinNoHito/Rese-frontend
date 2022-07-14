import { shop } from "~/types/api";
import { indexInitData } from "~/types/pageData";

export default interface indexServiceInterface {
  getData(userId: number): Promise<indexInitData>;
  toggleFavorite(favoriteShopsId: number[], selectedShopId: number, userId: number): Promise<number[]>;
  searchShops(regionId: string, genreId: string, searchWord: string, shopList: shop[]): shop[]; 
}