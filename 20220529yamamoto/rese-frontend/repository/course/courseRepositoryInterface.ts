import { sendData } from "~/types/api";

export default interface courseRepositoryInterface {
  register(sendData: sendData): Promise<void>;
  delete(id: number): Promise<void>;
}