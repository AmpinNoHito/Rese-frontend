import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { courseRequest } from "~/types/axiosRequest";
import courseRepositoryInterface from "./courseRepositoryInterface";

export default class courseRepository implements courseRepositoryInterface {
  readonly axios: NuxtAxiosInstance;

  constructor (axios: NuxtAxiosInstance) {
    this.axios = axios;
  }

  async register(sendData: courseRequest): Promise<void> {
    return this.axios.post('/api/admin/courses', sendData);
  }

  async delete(id: number): Promise<void> {
    return this.axios.delete(`/api/admin/courses/${id}`);
  }
}