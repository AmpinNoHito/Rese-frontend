import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { PayRequest, ReservationRequest } from "~/types/axiosRequest";
import { NewReservationResponse, ReservationCollectionResponse, ReservationResponse } from "~/types/axiosResponse";
import ReservationRepositoryInterface from "./ReservationRepositoryInterface";

export default class ReservationRepository implements ReservationRepositoryInterface {
  readonly axios: NuxtAxiosInstance;

  constructor (axios: NuxtAxiosInstance) {
    this.axios = axios;
  }

  async register(sendData: ReservationRequest): Promise<NewReservationResponse> {
    return this.axios.post('/api/reservations', sendData);
  }

  async getById(id: number): Promise<ReservationResponse> {
    return this.axios.get(`/api/reservations/${id}`);
  }

  async getByUserId(userId: number): Promise<ReservationCollectionResponse> {
    return this.axios.get(`/api/reservations/user/${userId}`);
  }

  async update(id: number, sendData: ReservationRequest): Promise<void> {
    return this.axios.put(`/api/reservations/${id}`, sendData);
  }

  async delete(id: number): Promise<void> {
    return this.axios.delete(`/api/reservations/${id}`);
  }

  async pay(id: number, sendData: PayRequest): Promise<void> {
    return this.axios.post(`/api/reservations/pay/${id}`, sendData);
  }

  async visit(id: number): Promise<void> {
    return this.axios.put(`/api/reservations/visit/${id}`);
  }
}