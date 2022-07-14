import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { FavoriteRequest } from "~/types/axiosRequest";
import FavoriteRepositoryInterface from "./FavoriteRepositoryInterface";

export default class favoriteRepository implements FavoriteRepositoryInterface {
  readonly axios: NuxtAxiosInstance;

  constructor (axios: NuxtAxiosInstance) {
    this.axios = axios;
  }

  async register(sendData: FavoriteRequest): Promise<void> {
    return this.axios.post('/api/favorites', sendData);
  }

  async delete(userId: number, shopId: number): Promise<void> {
    return this.axios.delete(`/api/favorites/${userId}/${shopId}`);
  }
}