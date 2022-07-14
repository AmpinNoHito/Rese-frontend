import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { AuthRequest } from "~/types/axiosRequest";
import { tokenResponse, UserResponse } from "~/types/axiosResponse";
import UserRepositoryInterface from "./UserRepositoryInterface";

export default class UserRepository implements UserRepositoryInterface {
  readonly axios: NuxtAxiosInstance;

  constructor (axios: NuxtAxiosInstance) {
    this.axios = axios;
  }

  async register(sendData: AuthRequest): Promise<void> {
    return this.axios.post('/api/auth/register', sendData);
  }

  async registerRepresentative(sendData: AuthRequest): Promise<void> {
    return this.axios.post('/api/admin/representatives', sendData);
  }

  async login(sendData: AuthRequest): Promise<tokenResponse> {
    return this.axios.post('/api/auth/login', sendData);
  }

  async logout(): Promise<void> {
    return this.axios.post('/api/auth/logout');
  }

  async getUser(token?: string): Promise<UserResponse> {
    if (token) {
      const headers = { headers : {'Authorization': `Bearer ${token}`}};
      return this.axios.get('/api/auth/user', headers);
    } else {
      return this.axios.get('/api/auth/user');
    }
  }
}