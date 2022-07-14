import { NewShop, Shop } from "~/types/api";
import { AdminIndexInitData } from "~/types/pageData";

export default interface AdminIndexServiceInterface {
  getData(representativeId: number): Promise<AdminIndexInitData>;
  registerShop(data: NewShop): Promise<Shop[]>;
}