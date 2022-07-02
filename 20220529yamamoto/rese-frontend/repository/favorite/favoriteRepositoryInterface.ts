import { sendData } from "~/types/api";

export default interface favoriteRepositoryInterface {
  register(sendData: sendData): Promise<void>;
  delete(userId: number, shopId: number): Promise<void>;
};
