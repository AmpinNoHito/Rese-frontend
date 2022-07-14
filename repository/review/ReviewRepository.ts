import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { ReviewRequest } from "~/types/axiosRequest";
import ReviewRepositoryInterface from "./ReviewRepositoryInterface";

export default class ReviewRepository implements ReviewRepositoryInterface {
  readonly axios: NuxtAxiosInstance;

  constructor (axios: NuxtAxiosInstance) {
    this.axios = axios;
  }

  async register(sendData: ReviewRequest): Promise<void> {
    return this.axios.post('/api/reviews', sendData);
  }

  async update(id: number, sendData: ReviewRequest): Promise<void> {
    return this.axios.put(`/api/reviews/${id}`, sendData);
  }

  async delete(id: number): Promise<void> {
    return this.axios.delete(`/api/reviews/${id}`);
  }
}