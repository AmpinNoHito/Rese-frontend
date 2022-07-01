import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { sendData } from "~/types/api";

export default class favoriteRepository {
  private readonly axios: NuxtAxiosInstance;
  private routePath: string = '/api/favorites';

  constructor (axios: NuxtAxiosInstance) {
    this.axios = axios;
  }

  public async register(sendData: sendData): Promise<void> {
    await this.axios.post(this.routePath, sendData);
  }

  public async delete(userId: number, shopId: number): Promise<void> {
    await this.axios.delete(`${this.routePath}/${userId}/${shopId}`);
  }
}