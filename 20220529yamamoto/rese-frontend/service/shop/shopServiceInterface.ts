import { newReservation } from "~/types/api";
import { RawLocation } from 'vue-router';
import { shopInitData } from "~/types/pageData";
import { NuxtAppOptions } from "@nuxt/types/app";
import { Dictionary } from 'vue-router/types/router';

export default interface shopServiceInterface {
  getData(shopId: number, app: NuxtAppOptions, query: Dictionary<string | (string | null)[]>): Promise<shopInitData>;
  registerReservation(data: newReservation, userId: number, shopId: number): Promise<RawLocation>;
}