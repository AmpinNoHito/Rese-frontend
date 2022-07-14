import { PayRequest, ReservationRequest } from "~/types/axiosRequest";
import { NewReservationResponse, ReservationCollectionResponse, ReservationResponse } from "~/types/axiosResponse";

export default interface ReservationRepositoryInterface {
  register(sendData: ReservationRequest): Promise<NewReservationResponse>;
  getById(id: number): Promise<ReservationResponse>;
  getByUserId(userId: number): Promise<ReservationCollectionResponse>;
  update(id: number, sendData: ReservationRequest): Promise<void>;
  delete(id: number): Promise<void>;
  pay(id: number, sendData: PayRequest): Promise<void>;
  visit(id: number): Promise<void>;
}