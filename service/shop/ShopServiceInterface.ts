import { NewReservation } from "~/types/api";
import { Location } from 'vue-router';
import { ShopInitData, ShopQuery } from "~/types/pageData";

export default interface ShopServiceInterface {
  getData(shopId: number, today: string, query: ShopQuery): Promise<ShopInitData>;
  registerReservation(data: NewReservation, userId: number, shopId: number): Promise<Location>;
}