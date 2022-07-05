import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { sendData } from "~/types/api";
import reviewRepositoryInterface from "./reviewRepositoryInterface";

export default class reviewRepository implements reviewRepositoryInterface {
  readonly axios: NuxtAxiosInstance;

  constructor (axios: NuxtAxiosInstance) {
    this.axios = axios;
  }

  async register(sendData: sendData): Promise<void> {
    return this.axios.post('/api/reviews', sendData);
  }

  async update(id: number, sendData: sendData): Promise<void> {
    return this.axios.put(`/api/reviews/${id}`, sendData);
  }

  async delete(id: number): Promise<void> {
    return this.axios.delete(`/api/reviews/${id}`);
  }
}