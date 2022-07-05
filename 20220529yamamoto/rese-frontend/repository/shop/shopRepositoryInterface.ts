import { shop, sendData } from "~/types/api";
import { shopCollectionResponse, shopResponse } from "~/types/axiosResponse";

export default interface shopRepositoryInterface {
  register(sendData: sendData): Promise<void>;
  index(): Promise<shopCollectionResponse>;
  getById(id: number): Promise<shopResponse>;
  getByRepresentativeId(representativeId: number): Promise<shopCollectionResponse>;
  getByIdAsRepresentative(id: number, representativeId: number): Promise<shopResponse>;
  getFavoriteShops(userId: number): Promise<shopCollectionResponse>;
  update(shopId: number, sendData: sendData): Promise<void>;
}
