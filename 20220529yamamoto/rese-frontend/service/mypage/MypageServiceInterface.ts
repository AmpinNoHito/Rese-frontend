import { NewReservation, NewReview, Reservation, Shop } from "~/types/api";
import { MypageInitData } from "~/types/pageData";

export default interface MypageServiceInterface {
  getData(userId: number, today: string): Promise<MypageInitData>;
  setNewReservationData(selectedReservation: Reservation): NewReservation;
  updateReservation(data: NewReservation, userId: number): Promise<Reservation[]>;
  deleteReservation(index: number, reservationId: number, reservations: Reservation[]): Promise<void>;
  setNewReviewData(selectedHistory: Reservation): NewReview;
  registerReview(data: NewReview, userId: number): Promise<Reservation[]>;
  updateReview(data: NewReview, userId: number): Promise<Reservation[]>;
  deleteReview(id: number, histories: Reservation[], userId: number): Promise<Reservation[]>;
  deleteFavorite(shopIndex: number, userId: number, shopId: number, favoriteShops: Shop[]): Promise<void>;
}