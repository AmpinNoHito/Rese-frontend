import { newCourse, newReservation, newReview, newShop, reservation, shop } from "./api"
import { authRequest } from "./axiosRequest";
import { errors } from "./errors";

/* data用 */
export interface indexData {
  shops: shop[],
  regionIds: number[],
  genreIds: number[],
  favoriteShopIds: number[],
  searchResults: shop[],
  searchWord: string,
  userId: number,
}

export interface mypageData {
  userId: number,
  reservations: reservation[],
  histories: reservation[],
  favoriteShops: shop[],
  today: string,
  qrcode: string,
  showHistory: false,
  newReservation: newReservation,
  newReview: newReview,
  errors: errors,
}

export interface shopData {
  shop: shop,
  newReservation: newReservation,
  errors: errors,
}

export interface adminIndexData {
  shops: shop[],
  previewImage: (string | undefined),
  newShop: newShop,
  errors: errors,
}

export interface adminShopData {
  representativeId: number,
  shop: shop,
  reservations: reservation[],
  histories: reservation[],
  codeReaderStartingUp: boolean,
  selectedReservation: reservation,
  showHistory: boolean,
  previewImage: (string | undefined),
  selectedReview: {
    rate: number,
    title: string,
    content: string,
  },
  newShop: newShop,
  newCourse: newCourse,
  errors: errors,
}

export interface authData {
  form: authRequest,
  errors: errors,
}

export interface payData {
  reservation: reservation,
}

/* asyncData用 */
export interface indexInitData {
  shops: shop[],
  regionIds: number[],
  genreIds: number[],
  favoriteShopIds: number[],
  searchResults: shop[],
  userId: number,
}

export interface mypageInitData {
  userId: number,
  reservations: reservation[],
  histories: reservation[],
  favoriteShops: shop[],
  today: string,
}

export interface shopInitData {
  shop: shop,
  newReservation: newReservation,
}

/* shopページのクエリパラメータを文字列化したもの */
export interface shopQuery {
  dt?: string,
  tm?: string,
  nm?: string,
  sc?: string,
}

export interface payInitData {
  reservation: reservation,
}

export interface adminIndexInitData {
  shops: shop[],
  newShop: newShop,
}

export interface adminShopInitData {
  representativeId: number,
  shop: shop,
  reservations: reservation[],
  histories: reservation[],
  newShop: newShop,
}
