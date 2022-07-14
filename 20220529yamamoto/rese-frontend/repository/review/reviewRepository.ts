import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { reviewRequest } from "~/types/axiosRequest";
import reviewRepositoryInterface from "./reviewRepositoryInterface";

export default class reviewRepository implements reviewRepositoryInterface {
  readonly axios: NuxtAxiosInstance;

  constructor (axios: NuxtAxiosInstance) {
    this.axios = axios;
  }

  async register(sendData: reviewRequest): Promise<void> {
    return this.axios.post('/api/reviews', sendData);
  }

  async update(id: number, sendData: reviewRequest): Promise<void> {
    return this.axios.put(`/api/reviews/${id}`, sendData);
  }

  async delete(id: number): Promise<void> {
    return this.axios.delete(`/api/reviews/${id}`);
  }
}