import { reservation, sendData } from "~/types/api";
import { reservationResponse } from "~/types/axiosResponse";

export default interface reservationRepositoryInterface {
  register(sendData: sendData): Promise<reservation>;
  getById(id: number): Promise<{reservation: reservation, amount: number}>;
  getByUserId(userId: number): Promise<reservationResponse>;
  update(id: number, sendData: sendData): Promise<void>;
  delete(id: number): Promise<void>;
  pay(id: number, sendData: sendData): Promise<string>;
  visit(id: number): Promise<void>;
}