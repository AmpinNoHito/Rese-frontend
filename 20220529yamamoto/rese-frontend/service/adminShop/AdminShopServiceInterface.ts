import { Course, NewCourse, NewShop, Reservation, Shop } from "~/types/api";
import { AdminShopInitData } from "~/types/pageData";

export default interface adminShopServiceInterface {
  getData(shopId: number, representativeId: number): Promise<AdminShopInitData>;
  updateShop(shopId: number, data: NewShop): Promise<Shop>;
  registerCourse(shopId: number, data: NewCourse): Promise<Course[]>;
  deleteCourse(shopId: number, courseId: number, courses: Course[]): Promise<Course[]>;
  registerVisit(decodedResult: string, selectedReservation: Reservation, representativeId: number): Promise<Reservation[][]>;
  getReservations(shopId: number, representativeId: number): Promise<Reservation[][]>;
}