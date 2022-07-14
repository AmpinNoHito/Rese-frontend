import { payRequest, reservationRequest } from "~/types/axiosRequest";
import { newReservationResponse, reservationCollectionResponse, reservationResponse } from "~/types/axiosResponse";

export default interface reservationRepositoryInterface {
  register(sendData: reservationRequest): Promise<newReservationResponse>;
  getById(id: number): Promise<reservationResponse>;
  getByUserId(userId: number): Promise<reservationCollectionResponse>;
  update(id: number, sendData: reservationRequest): Promise<void>;
  delete(id: number): Promise<void>;
  pay(id: number, sendData: payRequest): Promise<void>;
  visit(id: number): Promise<void>;
}