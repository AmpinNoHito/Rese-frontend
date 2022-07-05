import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { sendData } from "~/types/api";
import { tokenResponse, userResponse } from "~/types/axiosResponse";
import userRepositoryInterface from "./userRepositoryInterface";

export default class userRepository implements userRepositoryInterface {
  readonly axios: NuxtAxiosInstance;

  constructor (axios: NuxtAxiosInstance) {
    this.axios = axios;
  }

  async register(sendData: sendData): Promise<void> {
    return this.axios.post('/api/auth/register', sendData);
  }

  async registerRepresentative(sendData: sendData): Promise<void> {
    return this.axios.post('/api/admin/representatives', sendData);
  }

  async login(sendData: sendData): Promise<tokenResponse> {
    return this.axios.post('/api/auth/login', sendData);
  }

  async logout(): Promise<void> {
    return this.axios.post('/api/auth/logout');
  }

  async getUser(token?: string): Promise<userResponse> {
    if (token) {
      const headers = { headers : {'Authorization': `Bearer ${token}`}};
      return this.axios.get('/api/auth/user', headers);
    } else {
      return this.axios.get('/api/auth/user');
    }
  }
}