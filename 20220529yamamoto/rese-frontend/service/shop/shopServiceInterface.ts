import { newReservation } from "~/types/api";
import { Location } from 'vue-router';
import { shopInitData, shopQuery } from "~/types/pageData";

export default interface shopServiceInterface {
  getData(shopId: number, today: string, query: shopQuery): Promise<shopInitData>;
  registerReservation(data: newReservation, userId: number, shopId: number): Promise<Location>;
}