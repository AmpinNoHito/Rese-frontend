import { Shop } from "~/types/api";
import { IndexInitData } from "~/types/pageData";

export default interface IndexServiceInterface {
  getData(userId: number): Promise<IndexInitData>;
  toggleFavorite(favoriteShopsId: number[], selectedShopId: number, userId: number): Promise<number[]>;
  searchShops(regionId: string, genreId: string, searchWord: string, shopList: Shop[]): Shop[]; 
}