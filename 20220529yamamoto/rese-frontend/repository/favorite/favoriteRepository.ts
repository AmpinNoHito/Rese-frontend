import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { favoriteRequest } from "~/types/axiosRequest";

import favoriteRepositoryInterface from "./favoriteRepositoryInterface";

export default class favoriteRepository implements favoriteRepositoryInterface {
  readonly axios: NuxtAxiosInstance;

  constructor (axios: NuxtAxiosInstance) {
    this.axios = axios;
  }

  async register(sendData: favoriteRequest): Promise<void> {
    return this.axios.post('/api/favorites', sendData);
  }

  async delete(userId: number, shopId: number): Promise<void> {
    return this.axios.delete(`/api/favorites/${userId}/${shopId}`);
  }
}