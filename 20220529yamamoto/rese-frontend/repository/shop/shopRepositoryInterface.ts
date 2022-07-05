import { shop, sendData } from "~/types/api";
import { adminShopResponse, favoriteShopResponse, shopIndexResponse, shopResponse } from "~/types/axiosResponse";

export default interface shopRepositoryInterface {
  register(sendData: sendData): Promise<void>;
  index(): Promise<shopIndexResponse>;
  getById(id: number): Promise<shopResponse>;
  getByRepresentativeId(representativeId: number): Promise<shop[]>;
  getByIdAsRepresentative(id: number, representativeId: number): Promise<adminShopResponse>;
  getFavoriteShops(userId: number): Promise<favoriteShopResponse>;
  update(shopId: number, sendData: sendData): Promise<void>;
}
