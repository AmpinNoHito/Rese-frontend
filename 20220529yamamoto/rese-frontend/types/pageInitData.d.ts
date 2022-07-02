import { course, newReservation, newShop, region, reservation, review, shop } from "./api"

export interface indexInitData {
  shops: shop[],
  regions: number[],
  genres: number[],
  favoriteShopsId: number[],
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
  amount: number,
}

export interface adminIndexInitData {
  shops: shop[],
  newShop: newShop,
}

export interface adminShopInitData {
  representativeId: number,
  shop: shop,
  courses: course[],
  reservations: reservation[],
  histories: reservation[],
  reviews: review[],
  newShop: newShop,
}
