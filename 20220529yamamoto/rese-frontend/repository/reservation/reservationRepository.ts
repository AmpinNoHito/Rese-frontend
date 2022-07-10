import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { reservation, sendData } from "~/types/api";
import { newReservationResponse, reservationCollectionResponse, reservationResponse } from "~/types/axiosResponse";
import reservationRepositoryInterface from "./reservationRepositoryInterface";

export default class reservationRepository implements reservationRepositoryInterface {
  readonly axios: NuxtAxiosInstance;

  constructor (axios: NuxtAxiosInstance) {
    this.axios = axios;
  }

  async register(sendData: sendData): Promise<newReservationResponse> {
    return this.axios.post('/api/reservations', sendData);
  }

  async getById(id: number): Promise<reservationResponse> {
    return this.axios.get(`/api/reservations/${id}`);
  }

  async getByUserId(userId: number): Promise<reservationCollectionResponse> {
    return this.axios.get(`/api/reservations/user/${userId}`);
  }

  async update(id: number, sendData: sendData): Promise<void> {
    return this.axios.put(`/api/reservations/${id}`, sendData);
  }

  async delete(id: number): Promise<void> {
    return this.axios.delete(`/api/reservations/${id}`);
  }

  async pay(id: number, sendData: sendData): Promise<void> {
    return this.axios.post(`/api/reservations/pay/${id}`, sendData);
  }

  async visit(id: number): Promise<void> {
    return this.axios.put(`/api/reservations/visit/${id}`);
  }
}