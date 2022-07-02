import { NuxtAppOptions } from "@nuxt/types";
import favoriteRepositoryInterface from "~/repository/favorite/favoriteRepositoryInterface";
import reservationRepositoryInterface from "~/repository/reservation/reservationRepositoryInterface";
import reviewRepositoryInterface from "~/repository/review/reviewRepositoryInterface";
import shopRepositoryInterface from "~/repository/shop/shopRepositoryInterface";
import { course, newReservation, newReview, reservation, sendData, shop, user } from "~/types/api";
import { mypageInitData } from "~/types/pageInitData";
import mypageServiceInterface from "./mypageServiceInterface";

export default class mypageService implements mypageServiceInterface{
  readonly reservationRepository: reservationRepositoryInterface;
  readonly shopRepository: shopRepositoryInterface;
  readonly reviewRepository: reviewRepositoryInterface;
  readonly favoriteRepository: favoriteRepositoryInterface;

  constructor (reservationRepository: reservationRepositoryInterface, shopRepository: shopRepositoryInterface, reviewRepository: reviewRepositoryInterface, favoriteRepository: favoriteRepositoryInterface) {
    this.reservationRepository = reservationRepository;
    this.shopRepository = shopRepository;
    this.reviewRepository = reviewRepository;
    this.favoriteRepository = favoriteRepository;
  }

  async getData({ $accessor, $getTodaysDate }: NuxtAppOptions): Promise<mypageInitData> {
    const data = {} as mypageInitData;

    const user = $accessor.user as user;
    data.userId = user.id;
    data.today = $getTodaysDate();

    /* 予約データ取得 */
    const reservationData: reservation[] = await this.reservationRepository.getByUserId(user.id);
    
    data.reservations = data.histories = [];
    if (reservationData.length) {   // 予約データがあれば
      /* 日付順にソートし */
      const sortedReservations: reservation[] = reservationData.sort((a, b) => (a.datetime < b.datetime) ? -1 : 1);
      /* まだ来店済みでない予約をreservationsとしてセット */
      data.reservations = sortedReservations.filter(reservation => reservation.visit_completed === 0);
      /* 来店済みの予約をhistoriesとしてセット */
      data.histories = sortedReservations.filter(reservation => reservation.visit_completed === 1).reverse();
    }

    /* お気に入り店舗取得 */
    data.favoriteShops = await this.shopRepository.getFavoriteShops(user.id);

    return data;
  }

  setNewReservationData(selectedReservation: reservation): newReservation {
    const data = {} as newReservation;
    /* 予約変更モーダル内のインプットに、選択された予約の情報を初期値として代入 */
    data.date = selectedReservation.datetime.slice(0, 10);
    data.time = selectedReservation.datetime.slice(11, -3);
    data.number = `${selectedReservation.number}人`;
    data.name = selectedReservation.shop.name;
    data.courses = selectedReservation.shop.courses;

    /* 変更する予約のidを記録 */
    data.selectedReservationId = selectedReservation.id;

    /* コースが選ばれている予約が選択された場合は、コースのインデックスも取得 */
    if (selectedReservation.course_id) {
      const selectedCourseIndex = selectedReservation.shop.courses?.findIndex(course => course.id === selectedReservation.course_id) as number;
      data.selectedCourseIndex = selectedCourseIndex;
    } else {
      data.selectedCourseIndex = undefined;
    }

    return data;
  }

  async updateReservation(data: newReservation, userId: number): Promise<reservation[]> {
    /* 入力値から送信用データを作成 */
    const sendData: sendData = {
      datetime: (data.date && data.time) ? `${data.date} ${data.time}` : '',
      number: +data.number.slice(0, -1),
      course_id: null,
    }

    /* コースが選択されていれば送信データに追加 */
    const newCourseIndex: (number | undefined) = data.selectedCourseIndex;
    if (newCourseIndex !== undefined) {
      const courses = data.courses as course[];
      sendData.course_id = courses[newCourseIndex].id;
    }

    try {
      /* 予約内容変更処理 */
      await this.reservationRepository.update(data.selectedReservationId as number, sendData);
      alert('予約内容を変更しました。');
      /* 予約データを取得 */
      const reservationData = await this.reservationRepository.getByUserId(userId);
      /* 日付順にソート */
      const sortedReservations: reservation[] = reservationData.sort((a, b) => (a.datetime < b.datetime) ? -1 : 1);
      /* まだ来店済みでない予約を返却 */
      return sortedReservations.filter(reservation => reservation.visit_completed === 0);
    } catch (error: any) {
      throw error;
    }
  }

  async deleteReservation([index, reservationId]: number[], reservations: reservation[]): Promise<reservation[]> {
    const ch = confirm('予約を取り消しますか？');
    if (!ch) return reservations;

    /* dataの配列とDBから削除 */
    try {
      await this.reservationRepository.delete(reservationId);
      return reservations.splice(index, 1);
    } catch (error: any) {
      throw error;
    }
  }

  setNewReviewData(selectedHistory: reservation): newReview {
    const data = {} as newReview;

    /* 新規レビューか否かを確認 */
    if (!selectedHistory.review) {
      data.isNew = true;
    } else {
      data.isNew = false;
    }

    /* インプットに初期値を設定 */
    data.rate = (selectedHistory.review) ? selectedHistory.review.rate : 0;
    data.title = (selectedHistory.review) ? selectedHistory.review.title : '';
    data.content = (selectedHistory.review) ? selectedHistory.review.content : '';

    /* 選択された予約履歴、レビューのIdを記録 */
    data.selectedHistoryId = selectedHistory.id;
    data.selectedReviewId = selectedHistory.review?.id;

    return data;
  }

  async registerReview(data: newReview, userId: number): Promise<reservation[]> {
    /* 入力値から送信用データを作成 */
    const sendData: sendData = {
      reservation_id: data.selectedHistoryId,
      rate: data.rate,
    }

    /* タイトルと内容は値がある場合のみ送信 */
    if (data.title) {
      sendData.title = data.title;
    }
    if (data.content) {
      sendData.content = data.content;
    }

    try {
      /* 新規作成実行 */
      await this.reviewRepository.register(sendData);
      alert('新規レビューを投稿しました。');
      /* 予約データを取得 */
      const reservationData = await this.reservationRepository.getByUserId(userId);
      /* 日付順にソート */
      const sortedReservations: reservation[] = reservationData.sort((a, b) => (a.datetime < b.datetime) ? -1 : 1);
      /* 来店済みの予約を返却 */
      return sortedReservations.filter(reservation => reservation.visit_completed === 1).reverse();
    } catch (error: any) {
      throw error;
    }
  }

  async updateReview(data: newReview, userId: number): Promise<reservation[]> {
    /* 入力値から送信用データを作成 */
    const sendData: sendData = {
      rate: data.rate,
    }

    /* タイトルと内容は値がある場合のみ送信 */
    if (data.title) {
      sendData.title = data.title;
    }
    if (data.content) {
      sendData.content = data.content;
    }

    try {
      /* レビュー内容変更処理 */
      await this.reviewRepository.update(data.selectedReviewId, sendData);
      alert('レビュー内容を変更しました。');
      /* 予約データを取得 */
      const reservationData = await this.reservationRepository.getByUserId(userId);
      /* 日付順にソート */
      const sortedReservations: reservation[] = reservationData.sort((a, b) => (a.datetime < b.datetime) ? -1 : 1);
      /* 来店済みの予約を返却 */
      return sortedReservations.filter(reservation => reservation.visit_completed === 1).reverse();
    } catch (error: any) {
      throw error;
    }
  }

  async deleteReview(id: number, histories: reservation[], userId: number): Promise<reservation[]> {
    /* 削除するか確認 */
    const ch = confirm('レビューを削除しますか？');
    if (!ch) return histories;

    /* DBから削除 */
    try {
      await this.reviewRepository.delete(id);
      alert('レビューを削除しました。');
      /* 予約データを取得 */
      const reservationData = await this.reservationRepository.getByUserId(userId);
      /* 日付順にソート */
      const sortedReservations: reservation[] = reservationData.sort((a, b) => (a.datetime < b.datetime) ? -1 : 1);
      /* 来店済みの予約を返却 */
      return sortedReservations.filter(reservation => reservation.visit_completed === 1).reverse();
    } catch (error: any) {
      throw error;
    }
  }

  async deleteFavorite(index: number, userId: number, shopId: number, favoriteShops: shop[]): Promise<shop[]> {
    const ch = confirm('お気に入り店舗から削除しますか？');
    if (!ch) return favoriteShops;
    
    /* dataの配列とDBから削除 */
    try {
      await this.favoriteRepository.delete(userId, shopId);
      return favoriteShops.splice(index, 1);
    } catch (error: any) {
      throw error;
    }
  }
}