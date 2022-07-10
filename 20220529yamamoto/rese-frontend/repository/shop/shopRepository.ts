import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { sendData } from "~/types/api";
import { shopCollectionResponse, shopResponse } from "~/types/axiosResponse";
import shopRepositoryInterface from "./shopRepositoryInterface";

export default class shopRepository implements shopRepositoryInterface {
  readonly axios: NuxtAxiosInstance;
  
  constructor (axios: NuxtAxiosInstance) {
    this.axios = axios;
  }

  async register(sendData: sendData): Promise<void> {
    return this.axios.post('api/admin/shops', sendData);
  }

  async index(): Promise<shopCollectionResponse> {
    return this.axios.get('/api/shops');
  }

  async getById(id: number): Promise<shopResponse> {
    return this.axios.get(`/api/shops/${id}`);
  }

  async getByRepresentativeId(representativeId: number): Promise<shopCollectionResponse> {
    return this.axios.get(`api/admin/shops/${representativeId}`);
  }

  async getByIdAsRepresentative(id: number, representativeId: number): Promise<shopResponse> {
    return this.axios.get(`api/admin/shops/${id}/${representativeId}`);
  }

  async getFavoriteShops(userId: number): Promise<shopCollectionResponse> {
    return this.axios.get(`/api/shops/favorites/${userId}`);
  }

  async update(shopId: number, sendData: sendData): Promise<void> {
    return this.axios.put(`/api/admin/shops/${shopId}`, sendData);
  }
}