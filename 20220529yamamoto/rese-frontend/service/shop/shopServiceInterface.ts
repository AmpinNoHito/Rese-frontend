import { newReservation } from "~/types/api";
import { RawLocation } from 'vue-router';
import { shopInitData } from "~/types/pageInitData";
import { NuxtAppOptions } from "@nuxt/types/app";

export default interface shopServiceInterface {
  getData(shopId: number, app: NuxtAppOptions, [date, time, number, selectedCourseIndex]: (string | (string | null)[])[]): Promise<shopInitData>;
  registerReservation(data: newReservation, userId: number, shopId: number,): Promise<RawLocation>;
}