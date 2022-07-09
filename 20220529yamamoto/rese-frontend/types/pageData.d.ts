import { course, newCourse, newReservation, newReview, newShop, reservation, review, sendData, shop } from "./api"
import { errors } from "./errors";

/* data */
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
  form: sendData,
  errors: errors,
}

export interface payData {
  reservation: reservation,
}


/* asyncData */
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
