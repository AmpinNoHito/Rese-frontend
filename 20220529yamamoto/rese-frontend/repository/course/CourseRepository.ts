import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { CourseRequest } from "~/types/axiosRequest";
import CourseRepositoryInterface from "./CourseRepositoryInterface";

export default class CourseRepository implements CourseRepositoryInterface {
  readonly axios: NuxtAxiosInstance;

  constructor (axios: NuxtAxiosInstance) {
    this.axios = axios;
  }

  async register(sendData: CourseRequest): Promise<void> {
    return this.axios.post('/api/admin/courses', sendData);
  }

  async delete(id: number): Promise<void> {
    return this.axios.delete(`/api/admin/courses/${id}`);
  }
}