import { course, newReservation, sendData, shop } from "~/types/api";
import reservationRepositoryInterface from "~/repository/reservation/reservationRepositoryInterface";
import shopServiceInterface from "./shopServiceInterface";
import shopRepositoryInterface from "~/repository/shop/shopRepositoryInterface";
import { RawLocation } from "vue-router";
import { shopInitData } from "~/types/pageInitData";
import { NuxtAppOptions } from "@nuxt/types/app";


export default class shopService implements shopServiceInterface {
  readonly shopRepository: shopRepositoryInterface;
  readonly reservationRepository: reservationRepositoryInterface;

  constructor(shopRepository: shopRepositoryInterface, reservationRepository: reservationRepositoryInterface) {
    this.shopRepository = shopRepository;
    this.reservationRepository = reservationRepository;
  }

  async getData(shopId: number, app: NuxtAppOptions, [date, time, number, selectedCourseIndex]: (string | (string | null)[])[]): Promise<shopInitData> {
    const data = {} as shopInitData;
    data.newReservation = {} as newReservation;
    
    data.newReservation.date = date as string ?? app.$getTodaysDate();
    data.newReservation.time = (time && time !== 'unselected') ? time as string : '';
    data.newReservation.number = (number && number !== 'unselected') ? number as string : '';
    data.newReservation.selectedCourseIndex = (selectedCourseIndex && selectedCourseIndex !== 'unselected') ?+selectedCourseIndex : undefined;

    try {
      data.shop = await this.shopRepository.getById(shopId);
      data.newReservation.courses = data.shop.courses ?? [];
      return data;
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