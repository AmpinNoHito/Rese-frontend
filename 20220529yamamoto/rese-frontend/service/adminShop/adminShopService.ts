import shopRepositoryInterface from "~/repository/shop/shopRepositoryInterface";
import { course, newCourse, newShop, reservation, sendData, shop } from "~/types/api";
import { adminShopInitData } from "~/types/pageData";
import adminShopServiceInterface from "./adminShopServiceInterface";
import courseRepositoryInterface from "~/repository/course/courseRepositoryInterface";
import reservationRepositoryInterface from "~/repository/reservation/reservationRepositoryInterface";
import { adminShopResponse } from "~/types/axiosResponse";

export default class adminShopService implements adminShopServiceInterface {
  readonly shopRepository: shopRepositoryInterface;
  readonly courseRepository: courseRepositoryInterface;
  readonly reservationRepository: reservationRepositoryInterface;

  constructor(shopRepository: shopRepositoryInterface, courseRepository: courseRepositoryInterface, reservationRepository: reservationRepositoryInterface) {
    this.shopRepository = shopRepository;
    this.courseRepository = courseRepository;
    this.reservationRepository = reservationRepository;
  }

  async getData(representativeId: number, shopId: number): Promise<adminShopInitData> {
    try {
      const res = await this.shopRepository.getByIdAsRepresentative(shopId, representativeId);
      return {
        representativeId: representativeId,
        shop: res.shop,
        courses: res.courses ?? [],
        newShop : { 
          name: res.shop.name,
          description: res.shop.description,
          genre_id: res.shop.genre.id,
          region_id: res.shop.region.id,
        },
        reservations: res.reservations ?? [],
        histories: res.histories ?? [],
      };
    } catch (error) {
      throw error;
    }
  }

  async updateShop(shopId: number, data: newShop): Promise<shop> {
    /* 入力値から送信用データを作成 */
    const sendData: sendData = {
      name: data.name,
      description: data.description,
      region_id: data.region_id,
      genre_id: data.genre_id,
    };

    /* 新規画像はある場合のみ送信 */
    if (data.base64EncodedImage) {
      sendData.base64EncodedImage = data.base64EncodedImage;
    }
    
    try {
      /* 店舗情報変更処理 */
      await this.shopRepository.update(shopId, sendData);
      alert('店舗情報が変更されました。');
      const res = await this.shopRepository.getById(shopId);
      return res.shop;
    } catch (error: any) {
      throw error;
    }
  }

  async registerCourse(shopId: number, data: newCourse): Promise<[course[], newCourse]> {
    /* 入力値から送信用データを作成 */
    const sendData = {
      shop_id: shopId,
      name: data.name,
      price: data.price,
      description: data.description,
    }

    try {
      /* 登録処理 */
      await this.courseRepository.register(sendData);
      alert('コースが正常に登録されました。');
      const res = await this.shopRepository.getById(shopId);
      data.name = data.description = data.price = undefined; // newCourseのデータを初期化
      return [res.courses, data];
    } catch (error: any) {
      throw error;
    }
  }

  async deleteCourse(shopId: number, courseId: number): Promise<course[]> {
    /* 削除するか確認 */
    const ch = confirm('コースを削除しますか？');
    if (!ch) {
      try {
        const res = await this.shopRepository.getById(shopId);
        return res.courses;
      } catch (error: any) {
        throw error;
      }
    }

    try {
      await this.courseRepository.delete(courseId);
      const res = await this.shopRepository.getById(shopId);
      return res.courses ?? [];
    } catch (error: any) {
      throw error;
    }
  }

  async registerVisit(decodedResult: string, selectedReservation: reservation, representativeId: number): Promise<reservation[][]> {
    const ids: string[] = decodedResult.split(',');
    const reservationIdResult: number = +ids[0];
    const userIdResult: number = +ids[1];
    
    /* QRコードの情報と予約情報が一致しなければアラート発出 */
    if (reservationIdResult !== selectedReservation.id || userIdResult === selectedReservation.user.id) {
      alert('予約情報がQRコードと一致しません。予約内容をご確認の上再度お試しください。');
      try {
        return await this.getReservations(selectedReservation.shop.id, representativeId);
      } catch (error: any) {
        throw error;
      }
    }
    
    /* 一致すれば来店処理 */
    try {
      await this.reservationRepository.visit(selectedReservation.id);
      alert('来店処理が完了しました。');
      return await this.getReservations(selectedReservation.shop.id, representativeId);
    } catch (error: any) {
      throw error;
    }
  }

  async getReservations(shopId: number, representativeId: number): Promise<reservation[][]> {
    const res: adminShopResponse = await this.shopRepository.getByIdAsRepresentative(shopId, representativeId);
    const reservations = res.reservations ?? [];
    const histories = res.histories ?? [];
    return [reservations, histories];
  };
};
