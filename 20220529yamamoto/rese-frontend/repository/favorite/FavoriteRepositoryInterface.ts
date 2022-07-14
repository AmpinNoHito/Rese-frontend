import { FavoriteRequest } from "~/types/axiosRequest";

export default interface FavoriteRepositoryInterface {
  register(sendData: FavoriteRequest): Promise<void>;
  delete(userId: number, shopId: number): Promise<void>;
};
