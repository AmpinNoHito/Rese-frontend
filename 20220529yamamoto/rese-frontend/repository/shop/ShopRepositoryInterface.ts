import { ShopRequest } from "~/types/axiosRequest";
import { ShopCollectionResponse, ShopResponse } from "~/types/axiosResponse";

export default interface ShopRepositoryInterface {
  register(sendData: ShopRequest): Promise<void>;
  index(): Promise<ShopCollectionResponse>;
  getById(id: number): Promise<ShopResponse>;
  getByRepresentativeId(representativeId: number): Promise<ShopCollectionResponse>;
  getByIdAsRepresentative(id: number, representativeId: number): Promise<ShopResponse>;
  getFavoriteShops(userId: number): Promise<ShopCollectionResponse>;
  update(shopId: number, sendData: ShopRequest): Promise<void>;
}
