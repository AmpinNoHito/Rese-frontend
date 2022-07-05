import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { shop, sendData } from "~/types/api";
import { adminShopResponse, favoriteShopResponse, shopIndexResponse, shopResponse } from "~/types/axiosResponse";
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

  async index(): Promise<shopIndexResponse> {
    try {
      const res = await this.axios.get('/api/shops');
      console.log(res.data.data);
      return {
        shops: res.data.data.shops,
        regionIds: res.data.data.regionIds,
        genreIds: res.data.data.genreIds,
      };
    } catch (error: any) {
      throw error;
    }
  }

  async getById(id: number): Promise<shopResponse> {
    try {
      const res = await this.axios.get(`/api/shops/${id}`);
      return {
        shop: res.data.data,
        courses: res.data.data.courses,
      }
    } catch (error) {
      throw error;
    }
  }

  async getByRepresentativeId(representativeId: number): Promise<shop[]> {
    try {
      const res = await this.axios.get(`api/admin/shops/${representativeId}`);
      return res.data.data.shops;
    } catch (error) {
      throw error;
    }
  }

  async getByIdAsRepresentative(id: number, representativeId: number): Promise<adminShopResponse> {
    try {
      const res = await this.axios.get(`api/admin/shops/${id}/${representativeId}`);
      console.log(res.data.data);
      return {
        shop: res.data.data,
        courses: res.data.data.courses,
        reservations: res.data.data.reservations,
        histories: res.data.data.histories,
      }
    } catch (error) {
      throw error;
    }
  }

  async getFavoriteShops(userId: number): Promise<favoriteShopResponse> {
    try {
      const res = await this.axios.get(`/api/shops/favorites/${userId}`);
      return {
        favoriteShops: res.data.data.shops,
        ids: res.data.data.ids,
      };
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