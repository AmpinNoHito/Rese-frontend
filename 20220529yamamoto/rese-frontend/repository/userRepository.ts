import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { user, sendData } from "~/types/api";

export default class userRepository {
  private readonly axios: NuxtAxiosInstance;
  private routePath: string = '/api/auth';
  private adminRoutePath: string = '/api/admin';

  constructor (axios: NuxtAxiosInstance) {
    this.axios = axios;
  }

  public async register(sendData: sendData): Promise<void> {
    try {
      await this.axios.post(`${this.routePath}/register`, sendData);
    } catch (error: any) {
      throw error;
    }
  }

  public async registerRepresentative(sendData: sendData): Promise<void> {
    try {
      await this.axios.post(`${this.adminRoutePath}/representatives`, sendData);
    } catch (error: any) {
      throw error;
    }
  }

  public async login(sendData: sendData): Promise<string> {
    try {
      const res = await this.axios.post(`${this.routePath}/login`, sendData);
      return res.data.token as string;
    } catch (error: any) {
      throw error;
    }
  }

  public async logout(): Promise<void> {
    try {
      await this.axios.post(`${this.routePath}/logout`);
    } catch (error: any) {
      throw error;
    }
  }

  public async getUser(): Promise<user> {
    const res = await this.axios.get(`${this.routePath}/user`);
    return res.data.user as user;
  }
}