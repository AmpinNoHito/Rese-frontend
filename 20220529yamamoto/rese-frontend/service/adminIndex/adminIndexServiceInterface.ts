import { newShop, shop } from "~/types/api";
import { adminIndexInitData } from "~/types/pageData";

export default interface adminIndexServiceInterface {
  getData(representativeId: number): Promise<adminIndexInitData>;
  registerShop(data: newShop): Promise<shop[]>;
}