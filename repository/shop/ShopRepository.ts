import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { ShopRequest } from "~/types/axiosRequest";
import { ShopCollectionResponse, ShopResponse } from "~/types/axiosResponse";
import ShopRepositoryInterface from "./ShopRepositoryInterface";

export default class ShopRepository implements ShopRepositoryInterface {
  readonly axios: NuxtAxiosInstance;
  
  constructor (axios: NuxtAxiosInstance) {
    this.axios = axios;
  }

  async register(sendData: ShopRequest): Promise<void> {
    return this.axios.post('api/admin/shops', sendData);
  }

  async index(): Promise<ShopCollectionResponse> {
    return this.axios.get('/api/shops');
  }

  async getById(id: number): Promise<ShopResponse> {
    return this.axios.get(`/api/shops/${id}`);
  }

  async getByRepresentativeId(representativeId: number): Promise<ShopCollectionResponse> {
    return this.axios.get(`api/admin/shops/${representativeId}`);
  }

  async getByIdAsRepresentative(shopId: number, representativeId: number): Promise<ShopResponse> {
    return this.axios.get(`api/admin/shops/${shopId}/${representativeId}`);
  }

  async getFavoriteShops(userId: number): Promise<ShopCollectionResponse> {
    return this.axios.get(`/api/shops/favorites/${userId}`);
  }

  async update(shopId: number, sendData: ShopRequest): Promise<void> {
    return this.axios.put(`/api/admin/shops/${shopId}`, sendData);
  }
}