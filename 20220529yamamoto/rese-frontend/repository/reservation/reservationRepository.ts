import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { reservation, sendData } from "~/types/api";
import reservationRepositoryInterface from "./reservationRepositoryInterface";

export default class reservationRepository implements reservationRepositoryInterface {
  readonly axios: NuxtAxiosInstance;

  constructor (axios: NuxtAxiosInstance) {
    this.axios = axios;
  }

  async register(sendData: sendData): Promise<reservation> {
    try {
      const res = await this.axios.post('/api/reservations', sendData);
      return res.data.newData as reservation;
    } catch (error) {
      throw error;
    }
  }

  async getById(id: number): Promise<reservation> {
    try {
      const res = await this.axios.get(`/api/reservations/${id}`);
      return res.data.data as reservation;
    } catch (error: any) {
      throw error;
    }
  }

  async getByUserId(userId: number): Promise<reservation[]> {
    try {
      const res = await this.axios.get(`/api/reservations/user/${userId}`);
      return res.data.data as reservation[];
    } catch (error: any) {
      throw error;
    }
  }

  async update(id: number, sendData: sendData): Promise<void> {
    try {
      await this.axios.put(`/api/reservations/${id}`, sendData);
    } catch (error: any) {
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.axios.delete(`/api/reservations/${id}`);
    } catch (error: any) {
      throw error;
    }
  }

  async pay(id: number, sendData: sendData): Promise<string> {
    try {
      const res = await this.axios.post(`/api/reservations/pay/${id}`, sendData);
      return res.data.message;
    } catch (error: any) {
      throw error;
    }
  }

  async visit(id: number): Promise<void> {
    try {
      await this.axios.put(`/api/reservations/visit/${id}`);
    } catch (error: any) {
      throw error;
    }
  }
}