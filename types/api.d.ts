export interface User {
  id: number,
  group: number,
  name: string,
  email: string,
}

export interface Region {
  id: number,
  name: string,
}

export interface Genre {
  id: number,
  name: string,
}

export interface Course {
  id: number,
  name: string,
  price: number,
  description: string,
}

export interface Shop {
  id: number,
  representative_id: number,
  name: string,
  region: Region,
  genre: Genre,
  description: string,
  image: string,
  courses: Course[],
  reservations?: Reservation[],
  histories?: Reservation[],
  reviews?: Review[],
}

export interface Review {
  id: number,
  rate: number,
  title: string,
  content: string,
}

export interface Reservation {
  id: number,
  user: {
    id: number,
    name: string,
  }
  shop: Shop,
  course?: Course,
  review?: Review,
  date: string,
  time: string,
  number: string,
  amount?: number,
  visit_completed: number,
  advance_payment: number,
}

/* 新規作成用 */
export interface NewShop {
  name: string,
  representative_id?: number,
  region_id: number,
  genre_id: number,
  description: string,
  base64EncodedImage?: string,
}

export interface NewCourse {
  name?: string,
  price?: number,
  description?: string,
}

export interface NewReservation {
  name?: string,
  date: string,
  time: string,
  number: string,
  courses?: Course[],
  selectedCourseIndex?: number,
  selectedReservationId: number,
  selectedReservationAmount?: number,
  hasBeenPaid: boolean,
}

export interface NewReview {
  rate: number,
  title: string,
  content: string,
  selectedHistoryId: number,
  selectedReviewId?: number,
  isNew: boolean,
}