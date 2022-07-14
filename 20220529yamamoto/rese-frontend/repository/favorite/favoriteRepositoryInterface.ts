import { favoriteRequest } from "~/types/axiosRequest";

export default interface favoriteRepositoryInterface {
  register(sendData: favoriteRequest): Promise<void>;
  delete(userId: number, shopId: number): Promise<void>;
};
