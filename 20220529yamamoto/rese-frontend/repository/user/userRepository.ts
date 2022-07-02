import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { AxiosResponse } from "axios";
import { user, sendData } from "~/types/api";
import userRepositoryInterface from "./userRepositoryInterface";

export default class userRepository implements userRepositoryInterface {
  readonly axios: NuxtAxiosInstance;

  constructor (axios: NuxtAxiosInstance) {
    this.axios = axios;
  }

  async register(sendData: sendData): Promise<void> {
    try {
      await this.axios.post('/api/auth/register', sendData);
    } catch (error: any) {
      throw error;
    }
  }

  async registerRepresentative(sendData: sendData): Promise<void> {
    try {
      await this.axios.post('/api/admin/representatives', sendData);
    } catch (error: any) {
      throw error;
    }
  }

  async login(sendData: sendData): Promise<[string, user]> {
    try {
      const res = await this.axios.post('/api/auth/login', sendData);
      const token: string = res.data.token;
      const user: user = await this.getUser(token);
      return [token, user];
    } catch (error: any) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.axios.post('/api/auth/logout');
    } catch (error: any) {
      throw error;
    }
  }

  async getUser(token?: string): Promise<user> {
    try {
      let res: AxiosResponse;
      if (token) {
        const headers = { headers : {'Authorization': `Bearer ${token}`}};
        res = await this.axios.get('/api/auth/user', headers);
      } else {
        res = await this.axios.get('/api/auth/user');
      }
      return res.data.user as user;
    } catch (error) {
      throw error;
    }
  }
}