import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { sendData } from "~/types/api";

export default class reviewRepository {
  private readonly axios: NuxtAxiosInstance;
  private routePath: string = '/api/reviews';

  constructor (axios: NuxtAxiosInstance) {
    this.axios = axios;
  }

  public async register(sendData: sendData): Promise<void> {
    try {
      await this.axios.post(this.routePath, sendData);
    } catch (error: any) {
      throw error;
    }
  }

  public async update(id: number, sendData: sendData): Promise<void> {
    try {
      await this.axios.put(`${this.routePath}/${id}`, sendData);
    } catch (error: any) {
      throw error;
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      await this.axios.delete(`${this.routePath}/${id}`);
    } catch (error: any) {
      throw error;
    }
  }
}