import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { sendData } from "~/types/api";
import reviewRepositoryInterface from "./reviewRepositoryInterface";

export default class reviewRepository implements reviewRepositoryInterface {
  readonly axios: NuxtAxiosInstance;

  constructor (axios: NuxtAxiosInstance) {
    this.axios = axios;
  }

  async register(sendData: sendData): Promise<void> {
    try {
      await this.axios.post('/api/reviews', sendData);
    } catch (error: any) {
      throw error;
    }
  }

  async update(id: number, sendData: sendData): Promise<void> {
    try {
      await this.axios.put(`/api/reviews/${id}`, sendData);
    } catch (error: any) {
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.axios.delete(`/api/reviews/${id}`);
    } catch (error: any) {
      throw error;
    }
  }
}