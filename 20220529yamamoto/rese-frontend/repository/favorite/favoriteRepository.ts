import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { sendData } from "~/types/api";
import favoriteRepositoryInterface from "./favoriteRepositoryInterface";

export default class favoriteRepository implements favoriteRepositoryInterface {
  readonly axios: NuxtAxiosInstance;

  constructor (axios: NuxtAxiosInstance) {
    this.axios = axios;
  }

  async register(sendData: sendData): Promise<void> {
    await this.axios.post('/api/favorites', sendData);
  }

  async delete(userId: number, shopId: number): Promise<void> {
    await this.axios.delete(`/api/favorites/${userId}/${shopId}`);
  }
}