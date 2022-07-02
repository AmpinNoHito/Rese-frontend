import { sendData } from "~/types/api";

export default interface reviewRepositoryInterface {
  register(sendData: sendData): Promise<void>;
  update(id: number, sendData: sendData): Promise<void>;
  delete(id: number): Promise<void>;
}