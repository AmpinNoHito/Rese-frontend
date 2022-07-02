export interface user {
  id: number,
  name: string,
  email: string,
  email_verified_at: string,
  group: number
  two_factor_recovery_codes: null
  two_factor_secret: null
  created_at: string,
  updated_at: string,
}

export interface region {
  id: number,
  name: string,
  created_at: string,
  updated_at: string,
}

export interface genre {
  id: number,
  name: string,
  created_at: string,
  updated_at: string,
}

export interface course {
  id: number,
  shop_id: number,
  name: string,
  price: number,
  description: string,
  created_at: string,
  updated_at: string,
}

export interface shop {
  id: number,
  representative_id: number,
  region_id: number,
  genre_id: number,
  name: string,
  description: string,
  image: string,
  created_at: string,
  updated_at: string,
  region: region,
  genre: genre,
  courses?: course[],
  reservations?: reservation[],
}

export interface review {
  id: number,
  reservation_id: number,
  rate: number,
  title: string,
  content: string,
  created_at: string,
  updated_at: string,
}

export interface reservation {
  id: number,
  user_id: number,
  shop_id: number,
  course_id: null,
  datetime: string,
  number: number,
  visit_completed: number,
  advance_payment: number,
  created_at: string,
  updated_at: string,
  shop: shop,
  review: review,
  course: course,
}

export interface sendData {
  [key: string]: (string | number | undefined | null),
}

export interface newShop {
  name: string,
  representative_id?: number,
  description: string,
  base64EncodedImage?: (string | undefined),
  region_id: number,
  genre_id: number,
}

export interface newCourse {
  name: (string | undefined),
  price: (number | undefined),
  description: (string | undefined),
}

export interface newReservation {
  name: string,
  date: string,
  time: string,
  number: string,
  courses?: (course[] | undefined),
  selectedCourseIndex: (number | undefined),
  selectedReservationId?: number,
}

export interface newReview {
  rate: number,
  title: string,
  content: string,
  selectedHistoryId: number,
  selectedReviewId: number,
  isNew: boolean,
}