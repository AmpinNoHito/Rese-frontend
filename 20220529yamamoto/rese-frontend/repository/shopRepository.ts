import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { shop, sendData } from "~/types/api";

export default class shopRepository {
  private readonly axios: NuxtAxiosInstance;
  private routePath: string = '/api/shops';
  private adminRoutePath: string = 'api/admin/shops';
  
  constructor (axios: NuxtAxiosInstance) {
    this.axios = axios;
  }

  public async register(sendData: sendData): Promise<void> {
    try {
      await this.axios.post(this.adminRoutePath, sendData);
    } catch (error: any) {
      throw error;
    }
  }

  public async index(): Promise<shop[]> {
    try {
      const res = await this.axios.get(this.routePath);
      return res.data.data as shop[];
    } catch (error: any) {
      throw error;
    }
  }

  public async getById(id: number): Promise<shop> {
    try {
      const res = await this.axios.get(`${this.routePath}/${id}`);
      return res.data.data as shop;
    } catch (error) {
      throw error;
    }
  }

  public async getByRepresentativeId(representativeId: number): Promise<shop[]> {
    try {
      const res = await this.axios.get(`${this.adminRoutePath}/${representativeId}`);
      return res.data.data as shop[];
    } catch (error) {
      throw error;
    }
  }

  public async getByIdAsRepresentative(id: number, representativeId: number): Promise<shop> {
    try {
      const res = await this.axios.get(`${this.adminRoutePath}/${id}/${representativeId}`);
      return res.data.data as shop;
    } catch (error) {
      throw error;
    }
  }

  public async getFavoriteShops(userId: number): Promise<shop[]> {
    try {
      const res = await this.axios.get(`${this.routePath}/favorites/${userId}`);
      return res.data.data as shop[];
    } catch (error: any) {
      throw error;
    }
  }
}