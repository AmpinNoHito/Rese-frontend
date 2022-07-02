import { NuxtAppOptions } from "@nuxt/types";
import { newShop, shop } from "~/types/api";
import { adminIndexInitData } from "~/types/pageInitData";

export default interface adminIndexServiceInterface {
  getData({ $accessor }: NuxtAppOptions): Promise<adminIndexInitData>;
  registerShop(data: newShop): Promise<shop[]>;
}