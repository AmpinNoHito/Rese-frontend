import shopRepositoryInterface from "~/repository/shop/shopRepositoryInterface";
import { course, newCourse, newShop, reservation, sendData, shop } from "~/types/api";
import { adminShopInitData } from "~/types/pageData";
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
    return await Promise.resolve(this.shopRepository.getByIdAsRepresentative(shopId, representativeId))
      .then(res => {
        const shop = res.data.data;
        return {
          representativeId: representativeId,
          shop: shop,
          courses: shop.courses ?? [],
          newShop : { 
            name: shop.name,
            description: shop.description,
            genre_id: shop.genre.id,
            region_id: shop.region.id,
          },
          reservations: shop.reservations ?? [],
          histories: shop.histories ?? [],
        };
      })
      .catch(error => {
        throw error;
      });
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
    
    /* 店舗情報変更処理 */
    await Promise.resolve(this.shopRepository.update(shopId, sendData))
      .then(res => alert('店舗情報が変更されました。'))
      .catch(error =>{
        throw error;
      });
    /* 店舗情報を再取得 */
    return await Promise.resolve(this.shopRepository.getById(shopId))
      .then(res => res.data.data)
      .catch(error =>{
        throw error;
      });
  }

  async registerCourse(shopId: number, data: newCourse): Promise<[course[], newCourse]> {
    /* 入力値から送信用データを作成 */
    const sendData = {
      shop_id: shopId,
      name: data.name,
      price: data.price,
      description: data.description,
    }

    /* 登録処理 */
    await Promise.resolve(this.courseRepository.register(sendData))
      .then(res => alert('コースが正常に登録されました。'))
      .catch(error => {
        throw error;
      });
    
    /* newCourseのデータを初期化 */
    data.name = data.description = data.price = undefined;
    
    /* 店舗情報を再取得 */
    return await Promise.resolve(this.shopRepository.getById(shopId))
      .then(res => [res.data.data.courses, data] as [course[], newCourse])
      .catch(error => {
        throw error;
      });
  }

  async deleteCourse(shopId: number, courseId: number, courses: course[]): Promise<course[]> {
    /* 削除するか確認 */
    const ch = confirm('コースを削除しますか？');
    if (!ch) {
      return courses;  // コース一覧をそのまま返却
    }

    /* 削除処理実行 */
    await Promise.resolve(this.courseRepository.delete(courseId))
      .catch(error => {
        throw error;
      });
    return await Promise.resolve(this.shopRepository.getById(shopId))
      .then(res => res.data.data.courses)
      .catch(error => {
        throw error;
      });
  }

  async registerVisit(decodedResult: string, selectedReservation: reservation, representativeId: number): Promise<reservation[][]> {
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
    await Promise.resolve(this.reservationRepository.visit(selectedReservation.id))
      .then(res => alert('来店処理が完了しました。'))
      .catch(error => {
        throw error;
      });
    return await this.getReservations(selectedReservation.shop.id, representativeId)
      .catch(error => {
        throw error;
      });
  }

  async getReservations(shopId: number, representativeId: number): Promise<reservation[][]> {
    return await Promise.resolve(this.shopRepository.getByIdAsRepresentative(shopId, representativeId))
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
