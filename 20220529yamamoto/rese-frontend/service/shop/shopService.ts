import { course, newReservation } from "~/types/api";
import reservationRepositoryInterface from "~/repository/reservation/reservationRepositoryInterface";
import shopServiceInterface from "./shopServiceInterface";
import shopRepositoryInterface from "~/repository/shop/shopRepositoryInterface";
import { Location } from "vue-router";
import { shopInitData } from "~/types/pageData";
import { NuxtAppOptions } from "@nuxt/types/app";
import { Dictionary } from 'vue-router/types/router';
import { reservationRequest } from "~/types/axiosRequest";


export default class shopService implements shopServiceInterface {
  readonly shopRepository: shopRepositoryInterface;
  readonly reservationRepository: reservationRepositoryInterface;

  constructor(shopRepository: shopRepositoryInterface, reservationRepository: reservationRepositoryInterface) {
    this.shopRepository = shopRepository;
    this.reservationRepository = reservationRepository;
  }

  async getData(shopId: number, app: NuxtAppOptions, query: Dictionary<string | (string | null)[]>): Promise<shopInitData> {
    const res = await this.shopRepository.getById(shopId)
      .catch(error => {
        throw error;
      });
    
    const shop = res.data.data;
    
    /* クエリパラメータをstring型に変換 */
    const date = app.$queryToString(query.dt);
    const time = app.$queryToString(query.tm);
    const number = app.$queryToString(query.nm);
    const selectedCourseIndex = app.$queryToString(query.sc);

    return {
      shop: shop,
      newReservation: {
        date: date ?? app.$getTodaysDate(),
        time: time ?? '',
        number: number ?? '',
        selectedCourseIndex: (selectedCourseIndex) ? +selectedCourseIndex : undefined,
        selectedReservationId: 0,
        courses: shop.courses,
      },
    }
  };

  async registerReservation(data: newReservation, userId: number, shopId: number): Promise<Location> {
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
    const sendData: reservationRequest = {
      user_id: userId,
      shop_id: shopId,
      datetime: (data.date && data.time) ? `${data.date} ${data.time}` : '',
      number: +data.number?.slice(0, -1),
    }

    /* コースが選択されている場合はコースのIdも追加 */
    if (data.selectedCourseIndex !== undefined) {
      const courses = data.courses as course[];
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