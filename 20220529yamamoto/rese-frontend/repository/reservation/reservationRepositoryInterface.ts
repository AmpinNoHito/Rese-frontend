import { reservation, sendData } from "~/types/api";
import { newReservationResponse, reservationCollectionResponse, reservationResponse } from "~/types/axiosResponse";

export default interface reservationRepositoryInterface {
  register(sendData: sendData): Promise<newReservationResponse>;
  getById(id: number): Promise<reservationResponse>;
  getByUserId(userId: number): Promise<reservationCollectionResponse>;
  update(id: number, sendData: sendData): Promise<void>;
  delete(id: number): Promise<void>;
  pay(id: number, sendData: sendData): Promise<void>;
  visit(id: number): Promise<void>;
}