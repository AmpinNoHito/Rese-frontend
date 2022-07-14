import { NewCourse, NewReservation, NewReview, NewShop, Reservation, Shop } from "./api"
import { AuthRequest } from "./axiosRequest";
import { Errors } from "./errors";

/* data用 */
export interface IndexData {
  shops: Shop[],
  regionIds: number[],
  genreIds: number[],
  favoriteShopIds: number[],
  searchResults: Shop[],
  searchWord: string,
  userId: number,
}

export interface MypageData {
  userId: number,
  reservations: Reservation[],
  histories: Reservation[],
  favoriteShops: Shop[],
  today: string,
  qrcode: string,
  showHistory: false,
  newReservation: NewReservation,
  newReview: NewReview,
  errors: Errors,
}

export interface ShopData {
  shop: Shop,
  newReservation: NewReservation,
  errors: Errors,
}

export interface AdminIndexData {
  shops: Shop[],
  previewImage: (string | undefined),
  newShop: NewShop,
  errors: Errors,
}

export interface AdminShopData {
  representativeId: number,
  shop: Shop,
  reservations: Reservation[],
  histories: Reservation[],
  codeReaderStartingUp: boolean,
  selectedReservation: Reservation,
  showHistory: boolean,
  previewImage: (string | undefined),
  selectedReview: {
    rate: number,
    title: string,
    content: string,
  },
  newShop: NewShop,
  newCourse: NewCourse,
  errors: Errors,
}

export interface AuthData {
  form: AuthRequest,
  errors: Errors,
}

export interface PayData {
  reservation: Reservation,
}

/* asyncData用 */
export interface IndexInitData {
  shops: Shop[],
  regionIds: number[],
  genreIds: number[],
  favoriteShopIds: number[],
  searchResults: Shop[],
  userId: number,
}

export interface MypageInitData {
  userId: number,
  reservations: Reservation[],
  histories: Reservation[],
  favoriteShops: Shop[],
  today: string,
}

export interface ShopInitData {
  shop: Shop,
  newReservation: NewReservation,
}

/* shopページのクエリパラメータを文字列化したもの */
export interface ShopQuery {
  dt?: string,
  tm?: string,
  nm?: string,
  sc?: string,
}

export interface PayInitData {
  reservation: Reservation,
}

export interface AdminIndexInitData {
  shops: Shop[],
  newShop: NewShop,
}

export interface AdminShopInitData {
  representativeId: number,
  shop: Shop,
  reservations: Reservation[],
  histories: Reservation[],
  newShop: NewShop,
}
