import shopRepositoryInterface from "~/repository/shop/shopRepositoryInterface";
import { course, newCourse, newShop, reservation, sendData, shop } from "~/types/api";
import { adminShopInitData } from "~/types/pageInitData";
import adminShopServiceInterface from "./adminShopServiceInterface";
import courseRepositoryInterface from "~/repository/course/courseRepositoryInterface";
import reservationRepositoryInterface from "~/repository/reservation/reservationRepositoryInterface";

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
    const data = {} as adminShopInitData;
    data.representativeId = representativeId;
    /* 店舗データ取得 */
    data.shop = await this.shopRepository.getByIdAsRepresentative(shopId, representativeId);
    data.courses = data.shop.courses ?? [];

    data.newShop = {  // 店舗情報更新用の初期データをセット
      name: data.shop.name,
      description: data.shop.description,
      genre_id: data.shop.genre_id,
      region_id: data.shop.region_id,
    } 

    data.reservations = data.histories = [];
    if (data.shop?.reservations) {  // 店舗に予約データがあれば
      /* 日付順にソートし */
      const sortedReservations: reservation[] = data.shop.reservations.sort((a, b) => (a.datetime < b.datetime) ? -1 : 1);
      /* まだ来店済みでない予約をreservationsとしてセット */
      data.reservations = sortedReservations.filter(reservation => reservation.visit_completed === 0);
      /* 来店済みの予約をhistoriesとしてセット */
      data.histories = sortedReservations.filter(reservation => reservation.visit_completed === 1).reverse();
    }

    data.reviews = [];
    if (data.histories?.length) { // 来店済みの予約があり
      data.histories.forEach(history => {
          if (history.review) {   // 予約履歴にレビューがついている場合
              data.reviews.push(history.review); // レビューをreviewsとしてセット
          }
      });
    }

    return data;
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
      return await this.shopRepository.getById(shopId);
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
      const shop = await this.shopRepository.getById(shopId);
      data.name = data.description = data.price = undefined; // newCourseのデータを初期化
      return [shop.courses as course[], data];
    } catch (error: any) {
      throw error;
    }
  }

  async deleteCourse(shopId: number, courseId: number): Promise<course[]> {
    /* 削除するか確認 */
    const ch = confirm('コースを削除しますか？');
    if (!ch) {
      try {
        const shop = await this.shopRepository.getById(shopId);
        return shop.courses as course[];
      } catch (error: any) {
        throw error;
      }
    };

    try {
      await this.courseRepository.delete(courseId);
      const shop = await this.shopRepository.getById(shopId);
      return shop.courses ?? [];
    } catch (error: any) {
      throw error;
    }
  }

  async registerVisit(decodedResult: string, selectedReservation: reservation, representativeId: number): Promise<reservation[][]> {
    const ids: string[] = decodedResult.split(',');
    const reservationIdResult: number = +ids[0];
    const userIdResult: number = +ids[1];
    const reservationId = selectedReservation.id;
    const userId = selectedReservation.user_id;
    const shopId = selectedReservation.shop_id;
    
    /* QRコードの情報と予約情報が一致しなければアラート発出 */
    if (reservationIdResult !== reservationId || userId !== userIdResult) {
      alert('予約情報がQRコードと一致しません。予約内容をご確認の上再度お試しください。');
      return this.getReservations(shopId, representativeId);
    }
    
    /* 一致すれば来店処理 */
    try {
      await this.reservationRepository.visit(reservationId);
      alert('来店処理が完了しました。');
      return this.getReservations(shopId, representativeId);
    } catch (error: any) {
      throw error;
    }
  }

  async getReservations(shopId: number, representativeId: number): Promise<reservation[][]> {
    const shop: shop = await this.shopRepository.getByIdAsRepresentative(shopId, representativeId);
    let reservations: reservation[] = [];
    let histories: reservation[] = [];

    if (shop.reservations) {
      const sortedData: reservation[] = shop.reservations.sort((a, b) => (a.datetime < b.datetime) ? -1 : 1);
      /* まだ来店済みでない予約を配列に */
      reservations = sortedData.filter(reservation => reservation.visit_completed === 0);
      /* 来店済みの予約を配列に */
      histories = sortedData.filter(reservation => reservation.visit_completed === 1).reverse();
    }
    
    return [reservations, histories];
  };
};
