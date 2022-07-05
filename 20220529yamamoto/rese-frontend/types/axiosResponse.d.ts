import { course, reservation, review, shop } from "./api";

export interface shopIndexResponse {
  shops: shop[],
  regionIds: number[],
  genreIds: number[],
}

export interface shopResponse {
  shop: shop, 
  courses: course[],
}

export interface favoriteShopResponse {
  favoriteShops: shop[],
  ids: number[], 
}

export interface adminShopResponse {
  shop: shop, 
  courses: course[],
  reservations: reservation[],
  histories: reservation[]
}

export interface reservationResponse {
  reservations: reservation[],
  histories: reservation[],
}