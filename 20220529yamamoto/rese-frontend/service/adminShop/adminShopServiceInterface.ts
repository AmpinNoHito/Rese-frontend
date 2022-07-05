import { course, newCourse, newShop, reservation, shop } from "~/types/api";
import { adminShopInitData } from "~/types/pageData";

export default interface adminShopServiceInterface {
  getData(representativeId: number, shopId: number): Promise<adminShopInitData>;
  updateShop(shopId: number, data: newShop): Promise<shop>;
  registerCourse(shopId: number, data: newCourse): Promise<[course[], newCourse]>;
  deleteCourse(shopId: number, courseId: number): Promise<course[]>;
  registerVisit(decodedResult: string, selectedReservation: reservation, representativeId: number): Promise<reservation[][]>;
  getReservations(shopId: number, representativeId: number): Promise<reservation[][]>;
}