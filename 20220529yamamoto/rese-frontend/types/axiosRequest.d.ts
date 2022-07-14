/* 予約 */
export interface reservationRequest {
  user_id?: number,
  shop_id?: number,
  course_id? : number
  datetime: string,
  number: number,
}

/* 支払 */
export interface payRequest {
  amount: number,
  source: string,
}

/* レビュー */
export interface reviewRequest {
  reservation_id?: number,
  rate: number,
  title?: string,
  content?: string,
}

/* コース */
export interface courseRequest {
  shop_id: number,
  name: string,
  price: number,
  description: string,
}

/* 認証関係 */
export interface authRequest {
  name?: string,
  email: string,
  password: string,
}

/* 店舗 */
export interface shopRequest {
  representative_id?: number,
  name: string,
  description: string,
  region_id: number,
  genre_id: number,
  base64EncodedImage?: string,
}

/* お気に入り */
export interface favoriteRequest {
  user_id: number,
  shop_id: number,
}

