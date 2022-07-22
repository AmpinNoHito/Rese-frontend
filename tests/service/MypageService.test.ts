import { NuxtAxiosInstance } from "@nuxtjs/axios";
import axios from "axios";
import FavoriteRepository from "~/repository/favorite/FavoriteRepository";
import FavoriteRepositoryInterface from "~/repository/favorite/FavoriteRepositoryInterface";
import ReservationRepository from "~/repository/reservation/ReservationRepository";
import ReservationRepositoryInterface from "~/repository/reservation/ReservationRepositoryInterface";
import ReviewRepository from "~/repository/review/ReviewRepository";
import ReviewRepositoryInterface from "~/repository/review/ReviewRepositoryInterface";
import ShopRepository from "~/repository/shop/ShopRepository";
import ShopRepositoryInterface from "~/repository/shop/ShopRepositoryInterface";
import MypageService from "~/service/mypage/MypageService";
import { NewReservation, NewReview } from "~/types/api";
import { ReservationRequest, ReviewRequest } from "~/types/axiosRequest";
import { MypageInitData } from "~/types/pageData";
import { COURSE, HISTORY, RESERVATION, RESERVATION_COLLECTION_RESPONSE, REVIEW, SHOP, SHOP_COLLECTION_RESPONSE } from "../consts";

/* reservationRepositoryのインスタンスを作成、必要なメソッドをモック化 */
const reservationRepositoryInstance: ReservationRepositoryInterface = new ReservationRepository(axios as NuxtAxiosInstance);
const mockGetReservationByUserId = jest.spyOn(reservationRepositoryInstance, 'getByUserId')
  .mockImplementation((userId: number) => Promise.resolve(RESERVATION_COLLECTION_RESPONSE));
const mockUpdateReservation = jest.spyOn(reservationRepositoryInstance, 'update')
  .mockImplementation((id: number, sendData: ReservationRequest) => Promise.resolve());
const mockDeleteReservation = jest.spyOn(reservationRepositoryInstance, 'delete')
  .mockImplementation((id: number) => Promise.resolve());

/* shopRepositoryのインスタンスを作成、必要なメソッドをモック化 */
const shopRepositoryInstance: ShopRepositoryInterface = new ShopRepository(axios as NuxtAxiosInstance);
const mockGetFavoriteShops = jest.spyOn(shopRepositoryInstance, 'getFavoriteShops')
  .mockImplementation(() => Promise.resolve(SHOP_COLLECTION_RESPONSE));

/* reviewRepositoryのインスタンスを作成、必要なメソッドをモック化 */
const reviewRepositoryInstance: ReviewRepositoryInterface = new ReviewRepository(axios as NuxtAxiosInstance);
const mockRegisterReview = jest.spyOn(reviewRepositoryInstance, 'register')
  .mockImplementation((sendData: ReviewRequest) => Promise.resolve());
const mockUpdateReview = jest.spyOn(reviewRepositoryInstance, 'update')
  .mockImplementation((id: number, sendData: ReviewRequest) => Promise.resolve());
const mockDeleteReview = jest.spyOn(reviewRepositoryInstance, 'delete')
  .mockImplementation((id: number) => Promise.resolve());

/* favoriteRepositoryのインスタンスを作成、必要なメソッドをモック化 */
const favoriteRepositoryInstance: FavoriteRepositoryInterface = new FavoriteRepository(axios as NuxtAxiosInstance);
const mockDeleteFavorite = jest.spyOn(favoriteRepositoryInstance, 'delete')
  .mockImplementation((userId: number, shopId: number) => Promise.resolve());

/* window.alertをモック化 */
const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

/* window.confirmをモック化(chの値に応じて戻り値を切り替え) */
let ch: boolean;
jest.spyOn(window, 'confirm').mockImplementation(() => ch ? true : false);

/* テスト用のmypageServiceインスタンスを作成 */
const testingMypageService = new MypageService(reservationRepositoryInstance, shopRepositoryInstance, reviewRepositoryInstance, favoriteRepositoryInstance);

beforeEach(() =>{
  mockGetReservationByUserId.mockClear();
  mockAlert.mockClear();
});

test('test getData', async () => {
  const expectedRes: MypageInitData = {
    userId: 100,
    today: '2023-01-01',
    reservations: [RESERVATION],
    histories: [HISTORY],
    favoriteShops: [SHOP],
  }

  const res = await testingMypageService.getData(100, '2023-01-01');

  expect(mockGetReservationByUserId).toBeCalledWith(100);
  expect(res).toEqual(expectedRes);
});

/* RESERVATIONを引き数としてsetNewReservationDataを呼びだした場合に期待される戻り値 */
const newReservation: NewReservation = {
  name: 'test',
  date: '2023-01-01',
  time: '10:00',
  number:  '1人',
  courses: [COURSE],
  selectedCourseIndex: 0,
  selectedReservationId: 100,
  selectedReservationAmount: 10000,
  hasBeenPaid: true,
};

test('test setNewReservationData', () => {
  const reservationWithCourse = {
    ...RESERVATION,
    course: COURSE,
  }
  newReservation.selectedCourseIndex = 0;
  const res = testingMypageService.setNewReservationData(reservationWithCourse);

  expect(res).toEqual(newReservation);
});

describe('test updateReservation', () => {
  const expectedSendData: ReservationRequest = {
    datetime: '2023-01-01 10:00',
    number: 1,
    course_id: 100,
  };

  test('update without amount change', async () => {
    const res = await testingMypageService.updateReservation(newReservation, 100);
    
    expect(mockUpdateReservation).toBeCalledWith(newReservation.selectedReservationId, expectedSendData);
    expect(mockGetReservationByUserId).toBeCalledWith(100);
    expect(mockAlert).toBeCalledWith('予約内容を変更しました。');
    expect(res).toEqual([RESERVATION]);
  });

  test('update with amount change', async () => {
    mockUpdateReservation.mockClear();
    /* 人数を2人に変更 */
    newReservation.number = '2人';
    expectedSendData.number = 2;
    
    const res = await testingMypageService.updateReservation(newReservation, 100);

    expect(mockUpdateReservation).not.toBeCalled();
    expect(mockGetReservationByUserId).toBeCalledWith(100);
    expect(mockAlert).toBeCalledWith('支払済みのご予約は来店日時のみが変更可能です。\nその他の予約情報の変更をご希望の場合はRese運営事務局までご連絡ください。');
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

const newReview: NewReview = {
  isNew: true,
  rate: REVIEW.rate,
  title: REVIEW.title,
  content: REVIEW.content,
  selectedHistoryId: HISTORY.id,
}

test('test setNewReviewData', () => {
  const expectedRes: NewReview = {
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
  const expectedSendData: ReviewRequest = {
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
  const expectedSendData: ReviewRequest = {
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