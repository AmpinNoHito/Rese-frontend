import { NuxtAppOptions } from "@nuxt/types";
import { newReservation, newReview, reservation, shop } from "~/types/api";
import { mypageInitData } from "~/types/pageData";

export default interface mypageServiceInterface {
  getData(app: NuxtAppOptions): Promise<mypageInitData>;
  setNewReservationData(selectedReservation: reservation): newReservation;
  updateReservation(data: newReservation, userId: number): Promise<reservation[]>;
  deleteReservation(index: number, reservationId: number, reservations: reservation[]): Promise<void>;
  setNewReviewData(selectedHistory: reservation): newReview;
  registerReview(data: newReview, userId: number): Promise<reservation[]>;
  updateReview(data: newReview, userId: number): Promise<reservation[]>;
  deleteReview(id: number, histories: reservation[], userId: number): Promise<reservation[]>;
  deleteFavorite(index: number, userId: number, shopId: number, favoriteShops: shop[]): Promise<void>;
}