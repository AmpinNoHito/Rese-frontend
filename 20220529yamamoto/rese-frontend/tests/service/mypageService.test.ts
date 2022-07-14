import { NuxtAxiosInstance } from "@nuxtjs/axios";
import axios from "axios";
import favoriteRepository from "~/repository/favorite/favoriteRepository";
import favoriteRepositoryInterface from "~/repository/favorite/favoriteRepositoryInterface";
import reservationRepository from "~/repository/reservation/reservationRepository";
import reservationRepositoryInterface from "~/repository/reservation/reservationRepositoryInterface";
import reviewRepository from "~/repository/review/reviewRepository";
import reviewRepositoryInterface from "~/repository/review/reviewRepositoryInterface";
import shopRepository from "~/repository/shop/shopRepository";
import shopRepositoryInterface from "~/repository/shop/shopRepositoryInterface";
import mypageService from "~/service/mypage/mypageService";
import { newReservation, newReview } from "~/types/api";
import { reservationRequest, reviewRequest } from "~/types/axiosRequest";
import { COURSE, HISTORY, RESERVATION, RESERVATION_COLLECTION_RESPONSE, REVIEW, SHOP, SHOP_COLLECTION_RESPONSE } from "../consts";

/* reservationRepositoryのインスタンスを作成、必要なメソッドをモック化 */
const reservationRepositoryInstance: reservationRepositoryInterface = new reservationRepository(axios as NuxtAxiosInstance);
const mockGetReservationByUserId = jest.spyOn(reservationRepositoryInstance, 'getByUserId')
  .mockImplementation((userId: number) => Promise.resolve(RESERVATION_COLLECTION_RESPONSE));
const mockUpdateReservation = jest.spyOn(reservationRepositoryInstance, 'update')
  .mockImplementation((id: number, sendData: reservationRequest) => Promise.resolve());
const mockDeleteReservation = jest.spyOn(reservationRepositoryInstance, 'delete')
  .mockImplementation((id: number) => Promise.resolve());

/* shopRepositoryのインスタンスを作成、必要なメソッドをモック化 */
const shopRepositoryInstance: shopRepositoryInterface = new shopRepository(axios as NuxtAxiosInstance);
const mockGetFavoriteShops = jest.spyOn(shopRepositoryInstance, 'getFavoriteShops')
  .mockImplementation(() => Promise.resolve(SHOP_COLLECTION_RESPONSE));

/* reviewRepositoryのインスタンスを作成、必要なメソッドをモック化 */
const reviewRepositoryInstance: reviewRepositoryInterface = new reviewRepository(axios as NuxtAxiosInstance);
const mockRegisterReview = jest.spyOn(reviewRepositoryInstance, 'register')
  .mockImplementation((sendData: reviewRequest) => Promise.resolve());
const mockUpdateReview = jest.spyOn(reviewRepositoryInstance, 'update')
  .mockImplementation((id: number, sendData: reviewRequest) => Promise.resolve());
const mockDeleteReview = jest.spyOn(reviewRepositoryInstance, 'delete')
  .mockImplementation((id: number) => Promise.resolve());

/* favoriteRepositoryのインスタンスを作成、必要なメソッドをモック化 */
const favoriteRepositoryInstance: favoriteRepositoryInterface = new favoriteRepository(axios as NuxtAxiosInstance);
const mockDeleteFavorite = jest.spyOn(favoriteRepositoryInstance, 'delete')
  .mockImplementation((userId: number, shopId: number) => Promise.resolve());

/* window.alertをモック化 */
const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

/* window.confirmをモック化(chの値に応じて戻り値を切り替え) */
let ch: boolean;
const mockConfirm = jest.spyOn(window, 'confirm').mockImplementation(() => ch ? true : false);

/* テスト用のmypageServiceインスタンスを作成 */
const testingMypageService = new mypageService(reservationRepositoryInstance, shopRepositoryInstance, reviewRepositoryInstance, favoriteRepositoryInstance);

beforeEach(() =>{
  mockGetReservationByUserId.mockClear();
  mockAlert.mockClear();
});

const newReservation: newReservation = {
  name: RESERVATION.shop.name,
  date: RESERVATION.date,
  time: RESERVATION.time,
  number: RESERVATION.number,
  courses: RESERVATION.shop.courses,
  selectedReservationId: RESERVATION.id,
};

describe('test setNewReservationData', () => {
  test('set reservation without course', () => {
    const res = testingMypageService.setNewReservationData(RESERVATION);

    expect(res).toEqual(newReservation);
  });

  test('set reservation with course', () => {
    const reservationWithCourse = {
      ...RESERVATION,
      course: COURSE,
    }
    newReservation.selectedCourseIndex = 0;
    const res = testingMypageService.setNewReservationData(reservationWithCourse);

    expect(res).toEqual(newReservation);
  });
});

describe('test updateReservation', () => {
  const expectedSendData: reservationRequest = {
    datetime: '2023-01-01 10:00',
    number: 1,
    course_id: undefined,
  };

  test('update without course', async () => {
    newReservation.selectedCourseIndex = undefined;
    
    const res = await testingMypageService.updateReservation(newReservation, 100);
    
    expect(mockUpdateReservation).toBeCalledWith(newReservation.selectedReservationId, expectedSendData);
    expect(mockGetReservationByUserId).toBeCalledWith(100);
    expect(mockAlert).toBeCalledWith('予約内容を変更しました。');
    expect(res).toEqual([RESERVATION]);
  });

  test('update with course', async () => {
    mockUpdateReservation.mockClear();
    expectedSendData.course_id = 100;
    newReservation.selectedCourseIndex = 0;
    
    const res = await testingMypageService.updateReservation(newReservation, 100);

    expect(mockUpdateReservation).toBeCalledWith(newReservation.selectedReservationId, expectedSendData);
    expect(mockGetReservationByUserId).toBeCalledWith(100);
    expect(mockAlert).toBeCalledWith('予約内容を変更しました。');
    expect(res).toEqual([RESERVATION]);
  });
});

describe('test deleteReservation', () => {
  test('approve deletion', async () => {
    ch = true;
    const reservations = [RESERVATION];

    const res = await testingMypageService.deleteReservation(0, 100, reservations);

    expect(mockDeleteReservation).toBeCalledWith(100);
    expect(reservations).toEqual([]);
    expect(res).toBeUndefined();
  });

  test('cancel deletion', async () => {
    mockDeleteReservation.mockClear();
    ch = false;
    const reservations = [RESERVATION];

    const res = await testingMypageService.deleteReservation(0, 100, reservations);
    
    expect(mockDeleteReservation).not.toBeCalled();
    expect(reservations).toEqual([RESERVATION]);
    expect(res).toBeUndefined();
  });
});

const newReview: newReview = {
  isNew: true,
  rate: REVIEW.rate,
  title: REVIEW.title,
  content: REVIEW.content,
  selectedHistoryId: HISTORY.id,
}

test('test setNewReviewData', () => {
  const expectedRes: newReview = {
    isNew: false,
    rate: 5,
    title: 'test',
    content: 'test',
    selectedHistoryId: 200,
    selectedReviewId: 100,
  };
  const res = testingMypageService.setNewReviewData(HISTORY);
  
  expect(res).toEqual(expectedRes);
});

test('test registerReview', async () => {
  const expectedSendData: reviewRequest = {
    reservation_id: HISTORY.id,
    rate: REVIEW.rate,
    title: REVIEW.title,
    content: REVIEW.content,
  };

  const res = await testingMypageService.registerReview(newReview, 100);

  expect(mockRegisterReview).toBeCalledWith(expectedSendData);
  expect(mockGetReservationByUserId).toBeCalledWith(100);
  expect(mockAlert).toBeCalledWith('新規レビューを投稿しました。');
  expect(res).toEqual([HISTORY]);
});

test('test updateReview', async () => {
  newReview.isNew = false;
  newReview.selectedReviewId = REVIEW.id;
  const expectedSendData: reviewRequest = {
    rate: REVIEW.rate,
    title: REVIEW.title,
    content: REVIEW.content,
  };

  const res = await testingMypageService.updateReview(newReview, 100);

  expect(mockUpdateReview).toBeCalledWith(newReview.selectedReviewId, expectedSendData);
  expect(mockGetReservationByUserId).toBeCalledWith(100);
  expect(mockAlert).toBeCalledWith('レビュー内容を変更しました。');
  expect(res).toEqual([HISTORY]);
});


describe('test deleteReview', () => {
  const histories = [HISTORY]
  test('approve deletion', async () => {
    ch = true;

    const res = await testingMypageService.deleteReview(100, histories, 100);

    expect(mockDeleteReview).toBeCalledWith(100);
    expect(mockGetReservationByUserId).toBeCalledWith(100);
    expect(mockAlert).toBeCalledWith('レビューを削除しました。');
    expect(res).toEqual([HISTORY]);
  });

  test('cancel deletion', async () => {
    mockDeleteReview.mockClear();
    ch = false;

    const res = await testingMypageService.deleteReview(100, histories, 100);
    
    expect(mockDeleteReservation).not.toBeCalled();
    expect(mockGetReservationByUserId).not.toBeCalled();
    expect(mockAlert).not.toBeCalled();
    expect(res).toEqual([HISTORY]);
  });
});

describe('test deleteFavorite', () => {
  test('approve deletion', async () => {
    ch = true;
    const favoriteShops = [SHOP];

    const res = await testingMypageService.deleteFavorite(0, 100, 100, favoriteShops);

    expect(mockDeleteFavorite).toBeCalledWith(100, 100);
    expect(favoriteShops).toEqual([]);
    expect(res).toBeUndefined();
  });

  test('cancel deletion', async () => {
    mockDeleteFavorite.mockClear();
    ch = false;
    const favoriteShops = [SHOP];

    const res = await testingMypageService.deleteFavorite(0, 100, 100, favoriteShops);

    expect(mockDeleteFavorite).not.toBeCalled();
    expect(favoriteShops).toEqual([SHOP]);
    expect(res).toBeUndefined();
  });
});