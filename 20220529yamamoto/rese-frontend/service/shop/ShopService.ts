import { Course, NewReservation } from "~/types/api";
import ReservationRepositoryInterface from "~/repository/reservation/ReservationRepositoryInterface";
import ShopServiceInterface from "./ShopServiceInterface";
import ShopRepositoryInterface from "~/repository/shop/ShopRepositoryInterface";
import { Location } from "vue-router";
import { ShopInitData, ShopQuery } from "~/types/pageData";
import { ReservationRequest } from "~/types/axiosRequest";


export default class ShopService implements ShopServiceInterface {
  readonly shopRepository: ShopRepositoryInterface;
  readonly reservationRepository: ReservationRepositoryInterface;

  constructor(shopRepository: ShopRepositoryInterface, reservationRepository: ReservationRepositoryInterface) {
    this.shopRepository = shopRepository;
    this.reservationRepository = reservationRepository;
  }

  async getData(shopId: number, today: string, query: ShopQuery): Promise<ShopInitData> {
    const res = await this.shopRepository.getById(shopId)
      .catch(error => {
        throw error;
      });
    
    const shop = res.data.data;
    
    return {
      shop: shop,
      newReservation: {
        date: query.dt ?? today,
        time: query.tm ?? '',
        number: query.nm ?? '',
        selectedCourseIndex: (query.sc) ? +query.sc : undefined,
        selectedReservationId: 0,
        courses: shop.courses,
      },
    }
  };

  async registerReservation(data: NewReservation, userId: number, shopId: number): Promise<Location> {
    if (!userId) {  //  ログインしていない場合
      let query = {  //  ログインして戻ってきたあとに入力値を復元できるよう、クエリパラメータを活用
        sh: shopId.toString(),
        dt: data.date,
        tm: data.time,
        nm: data.number,
        sc: data.selectedCourseIndex?.toString(),
      }

      return {path: '/login', query: query};
    }

    /* 入力値から送信用データを作成 */
    const sendData: ReservationRequest = {
      user_id: userId,
      shop_id: shopId,
      datetime: (data.date && data.time) ? `${data.date} ${data.time}` : '',
      number: +data.number?.slice(0, -1),
    }

    /* コースが選択されている場合はコースのIdも追加 */
    if (data.selectedCourseIndex !== undefined) {
      const courses = data.courses as Course[];
      sendData.course_id = courses[data.selectedCourseIndex]?.id;
    }

    /* 予約実行 */
    const res = await this.reservationRepository.register(sendData)
      .catch(error => {
        throw error;
      });

    const newReservation = res.data.newData;
    
    return {
      path: '/done', 
      query: {  // コースが指定されている場合は予約Idをクエリパラメータで渡す
        rs: (sendData.course_id !== undefined) ? newReservation.id.toString() : '',
      }
    };
  }
}