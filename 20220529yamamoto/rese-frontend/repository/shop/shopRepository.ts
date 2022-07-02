import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { shop, sendData } from "~/types/api";
import shopRepositoryInterface from "./shopRepositoryInterface";

export default class shopRepository implements shopRepositoryInterface {
  readonly axios: NuxtAxiosInstance;
  
  constructor (axios: NuxtAxiosInstance) {
    this.axios = axios;
  }

  async register(sendData: sendData): Promise<void> {
    try {
      await this.axios.post('api/admin/shops', sendData);
    } catch (error: any) {
      throw error;
    }
  }

  async index(): Promise<shop[]> {
    try {
      const res = await this.axios.get('/api/shops');
      return res.data.data as shop[];
    } catch (error: any) {
      throw error;
    }
  }

  async getById(id: number): Promise<shop> {
    try {
      const res = await this.axios.get(`/api/shops/${id}`);
      return res.data.data as shop;
    } catch (error) {
      throw error;
    }
  }

  async getByRepresentativeId(representativeId: number): Promise<shop[]> {
    try {
      const res = await this.axios.get(`api/admin/shops/${representativeId}`);
      return res.data.data as shop[];
    } catch (error) {
      throw error;
    }
  }

  async getByIdAsRepresentative(id: number, representativeId: number): Promise<shop> {
    try {
      const res = await this.axios.get(`api/admin/shops/${id}/${representativeId}`);
      return res.data.data as shop;
    } catch (error) {
      throw error;
    }
  }

  async getFavoriteShops(userId: number): Promise<shop[]> {
    try {
      const res = await this.axios.get(`/api/shops/favorites/${userId}`);
      return res.data.data as shop[];
    } catch (error: any) {
      throw error;
    }
  }

  async update(shopId: number, sendData: sendData): Promise<void> {
    try {
      await this.axios.put(`/api/admin/shops/${shopId}`, sendData);
    } catch (error: any) {
      throw error;
    }
  }
}