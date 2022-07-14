/* 予約 */
export interface ReservationRequest {
  user_id?: number,
  shop_id?: number,
  course_id? : number
  datetime: string,
  number: number,
}

/* 支払 */
export interface PayRequest {
  amount: number,
  source: string,
}

/* レビュー */
export interface ReviewRequest {
  reservation_id?: number,
  rate: number,
  title?: string,
  content?: string,
}

/* コース */
export interface CourseRequest {
  shop_id: number,
  name: string,
  price: number,
  description: string,
}

/* 認証関係 */
export interface AuthRequest {
  name?: string,
  email: string,
  password: string,
}

/* 店舗 */
export interface ShopRequest {
  representative_id?: number,
  name: string,
  description: string,
  region_id: number,
  genre_id: number,
  base64EncodedImage?: string,
}

/* お気に入り */
export interface FavoriteRequest {
  user_id: number,
  shop_id: number,
}
