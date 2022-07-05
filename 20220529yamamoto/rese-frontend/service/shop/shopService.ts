import { course, newReservation, sendData } from "~/types/api";
import reservationRepositoryInterface from "~/repository/reservation/reservationRepositoryInterface";
import shopServiceInterface from "./shopServiceInterface";
import shopRepositoryInterface from "~/repository/shop/shopRepositoryInterface";
import { RawLocation } from "vue-router";
import { shopInitData } from "~/types/pageData";
import { NuxtAppOptions } from "@nuxt/types/app";


export default class shopService implements shopServiceInterface {
  readonly shopRepository: shopRepositoryInterface;
  readonly reservationRepository: reservationRepositoryInterface;

  constructor(shopRepository: shopRepositoryInterface, reservationRepository: reservationRepositoryInterface) {
    this.shopRepository = shopRepository;
    this.reservationRepository = reservationRepository;
  }

  async getData(shopId: number, app: NuxtAppOptions, [date, time, number, selectedCourseIndex]: string[]): Promise<shopInitData> {
    try {
      const res = await this.shopRepository.getById(shopId);
      return {
        shop: res.shop,
        newReservation: {
          date: date ?? app.$getTodaysDate(),
          time: (time && time !== 'unselected') ? time : '',
          number: (number && number !== 'unselected') ? number : '',
          selectedCourseIndex: (selectedCourseIndex && selectedCourseIndex !== 'unselected') ? +selectedCourseIndex : undefined,
          courses: res.courses,
        },
      }
    } catch (error: any) {
      throw error;
    }
  };

  async registerReservation(data: newReservation, userId: number, shopId: number): Promise<RawLocation> {
    if (!userId) {    //  ログインしていない場合
      let query = {   //  ログインして戻ってきたあとに入力値を復元できるよう、クエリパラメータを活用
        sh: shopId.toString(),
        dt: data.date,
        tm: data.time ?? 'unselected',
        nm: data.number ?? 'unselected',
        sc: data.selectedCourseIndex?.toString() ?? 'unselected',
      }

      return {path: '/login', query: query};
    }
    /* 入力値から送信用データを作成 */
    const sendData: sendData = {
      user_id: userId,
      shop_id: shopId,
      datetime: (data.date && data.time) ? `${data.date} ${data.time}` : '',
      number: data.number?.slice(0, -1),
    }

    /* コースが選択されている場合はコースのIdも追加 */
    if (data.selectedCourseIndex !== undefined) {
      const courses = data.courses as course[];
      sendData.course_id = courses[data.selectedCourseIndex]?.id;
    }

    try {
      /* 予約実行 */
      const newReservation = await this.reservationRepository.register(sendData);
      return {
        path: '/done', 
        query: {  // コースが選択されている場合は予約Idをクエリパラメータで渡す
          rs: (sendData.course_id !== undefined) ? newReservation.id.toString() : '',
        }
      };
    } catch (error: any) {
      throw error;
    }
  }

}