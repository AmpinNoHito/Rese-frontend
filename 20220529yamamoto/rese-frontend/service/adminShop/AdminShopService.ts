import shopRepositoryInterface from "~/repository/shop/ShopRepositoryInterface";
import { Course, NewCourse, NewShop, Reservation, Shop } from "~/types/api";
import { AdminShopInitData } from "~/types/pageData";
import AdminShopServiceInterface from "./AdminShopServiceInterface";
import CourseRepositoryInterface from "~/repository/course/CourseRepositoryInterface";
import ReservationRepositoryInterface from "~/repository/reservation/ReservationRepositoryInterface";
import { CourseRequest, ShopRequest } from "~/types/axiosRequest";

export default class AdminShopService implements AdminShopServiceInterface {
  readonly shopRepository: shopRepositoryInterface;
  readonly courseRepository: CourseRepositoryInterface;
  readonly reservationRepository: ReservationRepositoryInterface;

  constructor(shopRepository: shopRepositoryInterface, courseRepository: CourseRepositoryInterface, reservationRepository: ReservationRepositoryInterface) {
    this.shopRepository = shopRepository;
    this.courseRepository = courseRepository;
    this.reservationRepository = reservationRepository;
  }

  async getData(shopId: number, representativeId: number): Promise<AdminShopInitData> {
    const res = await this.shopRepository.getByIdAsRepresentative(shopId, representativeId)
      .catch(error => {
        throw error;
      });

    const shop = res.data.data;

    return {
      representativeId: representativeId,
      shop: shop,
      newShop : { 
        name: shop.name,
        description: shop.description,
        region_id: shop.region.id,
        genre_id: shop.genre.id,
      },
      reservations: shop.reservations ?? [],
      histories: shop.histories ?? [],
    };
  }

  async updateShop(shopId: number, data: NewShop): Promise<Shop> {
    /* 入力値から送信用データを作成 */
    const sendData: ShopRequest = {
      name: data.name,
      region_id: data.region_id,
      genre_id: data.genre_id,
      description: data.description,
    };

    /* 新規画像はある場合のみ送信 */
    if (data.base64EncodedImage) {
      sendData.base64EncodedImage = data.base64EncodedImage;
    }
    
    /* 店舗情報変更処理 */
    await this.shopRepository.update(shopId, sendData)
      .catch(error =>{
        throw error;
      });
    alert('店舗情報が変更されました。');

    /* 店舗情報を再取得 */
    const res = await this.shopRepository.getById(shopId)
      .catch(error =>{
        throw error;
      });
    return res.data.data;
  }

  async registerCourse(shopId: number, data: NewCourse): Promise<Course[]> {
    /* 入力値から送信用データを作成 */
    const sendData: CourseRequest = {
      shop_id: shopId,
      name: data.name ?? '',
      price: data.price ?? -1,
      description: data.description ?? '',
    }

    /* 登録処理 */
    await this.courseRepository.register(sendData)
      .catch(error => {
        throw error;
      });
    alert('コースが正常に登録されました。');
    
    /* 店舗情報を再取得 */
    const res = await this.shopRepository.getById(shopId)
      .catch(error => {
        throw error;
      });
    return res.data.data.courses;
  }

  async deleteCourse(shopId: number, courseId: number, courses: Course[]): Promise<Course[]> {
    /* 削除するか確認 */
    const ch = confirm('コースを削除しますか？');
    if (!ch) {
      return courses;  // コース一覧をそのまま返却
    }

    /* 削除処理実行 */
    await this.courseRepository.delete(courseId)
      .catch(error => {
        throw error;
      });
    const res = await this.shopRepository.getById(shopId)
      .catch(error => {
        throw error;
      });
    return res.data.data.courses;
  }

  async registerVisit(decodedResult: string, selectedReservation: Reservation, representativeId: number): Promise<Reservation[][]> {
    const ids: string[] = decodedResult.split(',');
    const reservationIdResult: number = +ids[0];
    const userIdResult: number = +ids[1];
    
    /* QRコードの情報と予約情報が一致しなければアラート発出 */
    if (reservationIdResult !== selectedReservation.id || userIdResult !== selectedReservation.user.id) {
      alert('予約情報がQRコードと一致しません。予約内容をご確認の上再度お試しください。');
      return await this.getReservations(selectedReservation.shop.id, representativeId)
        .catch(error => {
          throw error;
        });
    }
    
    /* 一致すれば来店処理 */
    await this.reservationRepository.visit(selectedReservation.id)
      .catch(error => {
        throw error;
      });
      alert('来店処理が完了しました。');

    return await this.getReservations(selectedReservation.shop.id, representativeId)
      .catch(error => {
        throw error;
      });
  }

  async getReservations(shopId: number, representativeId: number): Promise<Reservation[][]> {
    return await this.shopRepository.getByIdAsRepresentative(shopId, representativeId)
      .then(res => {
        const reservations = res.data.data.reservations ?? [];
        const histories = res.data.data.histories ?? [];
        return [reservations, histories];
      })
      .catch(error => {
        throw error;
      });
  };
};
