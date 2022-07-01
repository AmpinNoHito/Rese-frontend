import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { reservation, sendData } from "~/types/api";


export default class reservationRepository {
  private readonly axios: NuxtAxiosInstance;
  private routePath: string = '/api/reservations';

  constructor (axios: NuxtAxiosInstance) {
    this.axios = axios;
  }

  public async register(sendData: sendData): Promise<reservation> {
    try {
      const res = await this.axios.post(this.routePath, sendData);
      return res.data.newData as reservation;
    } catch (error) {
      throw error;
    }
  }

  public async getById(id: number): Promise<reservation> {
    try {
      const res = await this.axios.get(`${this.routePath}/${id}`);
      return res.data.data as reservation;
    } catch (error: any) {
      throw error;
    }
  }

  public async getByUserId(userId: number): Promise<reservation[]> {
    try {
      const res = await this.axios.get(`${this.routePath}/user/${userId}`);
      return res.data.data as reservation[];
    } catch (error: any) {
      throw error;
    }
  }

  public async update(id: number, sendData: sendData): Promise<void> {
    try {
      await this.axios.put(`${this.routePath}/${id}`, sendData);
    } catch (error: any) {
      throw error;
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      await this.axios.delete(`${this.routePath}/${id}`);
    } catch (error: any) {
      throw error;
    }
  }

  public async pay(id: number, sendData: sendData): Promise<string> {
    try {
      const res = await this.axios.post(`${this.routePath}/pay/${id}`, sendData);
      return res.data.message;
    } catch (error: any) {
      throw error;
    }
  }

  public async visit(id: number): Promise<void> {
    try {
      await this.axios.put(`${this.routePath}/visit/${id}`);
    } catch (error: any) {
      throw error;
    }
  }
}