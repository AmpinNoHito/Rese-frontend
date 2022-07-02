import { shop, sendData } from "~/types/api";

export default interface shopRepositoryInterface {
  register(sendData: sendData): Promise<void>;
  index(): Promise<shop[]>;
  getById(id: number): Promise<shop>;
  getByRepresentativeId(representativeId: number): Promise<shop[]>;
  getByIdAsRepresentative(id: number, representativeId: number): Promise<shop>;
  getFavoriteShops(userId: number): Promise<shop[]>;
  update(shopId: number, sendData: sendData): Promise<void>;
}
