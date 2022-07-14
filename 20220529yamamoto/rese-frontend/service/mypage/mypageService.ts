import { NuxtAppOptions } from "@nuxt/types";
import favoriteRepositoryInterface from "~/repository/favorite/favoriteRepositoryInterface";
import reservationRepositoryInterface from "~/repository/reservation/reservationRepositoryInterface";
import reviewRepositoryInterface from "~/repository/review/reviewRepositoryInterface";
import shopRepositoryInterface from "~/repository/shop/shopRepositoryInterface";
import { course, newReservation, newReview, reservation, shop } from "~/types/api";
import { reservationRequest, reviewRequest } from "~/types/axiosRequest";
import { mypageInitData } from "~/types/pageData";
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

  async getData(userId: number, today: string): Promise<mypageInitData> {
    const reservationPromise = this.reservationRepository.getByUserId(userId);
    const shopPromise = this.shopRepository.getFavoriteShops(userId);
    const res = await Promise.all([reservationPromise, shopPromise])
      .catch(error => {
        throw error;
      });

    const reservationResponse = res[0].data.data;
    const favoriteResponse = res[1].data.data;

    return {
      userId: userId,
      today: today,
      reservations: reservationResponse.reservations,
      histories: reservationResponse.histories,
      favoriteShops: favoriteResponse.shops,
    };
  }

  setNewReservationData(selectedReservation: reservation): newReservation {
    let selectedCourseIndex: (number | undefined);
    if (selectedReservation.course) { // 予約のコースが指定されている場合
      const selectedCourse = selectedReservation.course;
      selectedCourseIndex = selectedReservation.shop.courses?.findIndex(course => course.id === selectedCourse.id);
    } else {  // 指定されていない場合
      selectedCourseIndex = undefined;
    }
    return {
      /* 予約変更モーダル内のインプットに、選択された予約の情報を初期値として代入 */
      name: selectedReservation.shop.name,
      date: selectedReservation.date,
      time: selectedReservation.time,
      number: selectedReservation.number,
      courses: selectedReservation.shop.courses,
      /* 変更する予約のidを記録 */
      selectedReservationId: selectedReservation.id,
      selectedCourseIndex: selectedCourseIndex,
    };
  }

  async updateReservation(data: newReservation, userId: number): Promise<reservation[]> {
    /* 入力値から送信用データを作成 */
    const sendData: reservationRequest = {
      datetime: (data.date && data.time) ? `${data.date} ${data.time}` : '',
      number: +data.number.slice(0, -1),
      course_id: undefined,
    }

    /* コースが選択されていれば送信データに追加 */
    const newCourseIndex: (number | undefined) = data.selectedCourseIndex;
    if (newCourseIndex !== undefined) {
      const courses = data.courses as course[];
      sendData.course_id = courses[newCourseIndex].id;
    }

      /* 予約内容変更処理 */
      await this.reservationRepository.update(data.selectedReservationId, sendData)
        .catch(error => {
          throw error;
        });
      alert('予約内容を変更しました。');

      /* 変更後の予約データを取得 */
      const res = await this.reservationRepository.getByUserId(userId)
        .catch(error => {
          throw error;
        });
      return res.data.data.reservations;
  }

  async deleteReservation(reservationIndex: number, reservationId: number, reservations: reservation[]): Promise<void> {
    const ch = confirm('予約を取り消しますか？');
    if (!ch) return;

    /* dataの配列とDBから削除 */
    await this.reservationRepository.delete(reservationId)
      .catch(error => {
        throw error;
      });
    reservations.splice(reservationIndex, 1);
  }

  setNewReviewData(selectedHistory: reservation): newReview {
    return {
      isNew: (!selectedHistory.review) ? true : false,
      /* インプットに初期値を設定 */
      rate: (selectedHistory.review) ? selectedHistory.review.rate : 0,
      title: (selectedHistory.review) ? selectedHistory.review.title : '',
      content: (selectedHistory.review) ? selectedHistory.review.content : '',
      /* 選択された予約履歴、レビューのIdを記録 */
      selectedHistoryId: selectedHistory.id,
      selectedReviewId: selectedHistory.review?.id,
    };
  }

  async registerReview(data: newReview, userId: number): Promise<reservation[]> {
    /* 入力値から送信用データを作成 */
    const sendData: reviewRequest = {
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

    /* 新規作成実行 */
    await this.reviewRepository.register(sendData)
      .catch(error => {
        throw error;
      });
    alert('新規レビューを投稿しました。');
    /* 予約履歴データを取得 */
    const res = await this.reservationRepository.getByUserId(userId)
      .catch(error => {
        throw error;
      });
    return res.data.data.histories;
  }

  async updateReview(data: newReview, userId: number): Promise<reservation[]> {
    /* 入力値から送信用データを作成 */
    const sendData: reviewRequest = {
      rate: data.rate,
    }

    /* タイトルと内容は値がある場合のみ送信 */
    if (data.title) {
      sendData.title = data.title;
    }
    if (data.content) {
      sendData.content = data.content;
    }

    
    /* レビュー内容変更処理 */
    await this.reviewRepository.update(data.selectedReviewId as number, sendData)
      .catch(error => {
        throw error;
      });
    alert('レビュー内容を変更しました。');

    /* 予約履歴データを取得 */
    const res = await this.reservationRepository.getByUserId(userId)
      .catch(error => {
        throw error;
      });
    return res.data.data.histories;
  }

  async deleteReview(id: number, histories: reservation[], userId: number): Promise<reservation[]> {
    /* 削除するか確認 */
    const ch = confirm('レビューを削除しますか？');
    if (!ch) return histories;

    /* DBから削除 */
    await this.reviewRepository.delete(id)
      .catch(error => {
        throw error;
      });
    alert('レビューを削除しました。');

    /* 予約履歴データを取得 */
    const res = await this.reservationRepository.getByUserId(userId)
      .catch(error => {
        throw error;
      });
    return res.data.data.histories;
  }

  async deleteFavorite(shopIndex: number, userId: number, shopId: number, favoriteShops: shop[]): Promise<void> {
    const ch = confirm('お気に入り店舗から削除しますか？');
    if (!ch) return;
    
    /* dataの配列とDBから削除 */
    await this.favoriteRepository.delete(userId, shopId)
      .catch(error => {
        throw error;
      });
    favoriteShops.splice(shopIndex, 1)
  }
}