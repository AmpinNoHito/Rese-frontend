import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { sendData } from "~/types/api";
import courseRepositoryInterface from "./courseRepositoryInterface";

export default class courseRepository implements courseRepositoryInterface {
  readonly axios: NuxtAxiosInstance;

  constructor (axios: NuxtAxiosInstance) {
    this.axios = axios;
  }

  async register(sendData: sendData): Promise<void> {
    await this.axios.post('/api/admin/courses', sendData);
  }

  async delete(id: number): Promise<void> {
    await this.axios.delete(`/api/admin/courses/${id}`);
  }
}