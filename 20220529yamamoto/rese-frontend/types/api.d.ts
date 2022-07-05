export interface user {
  id: number,
  group: number
  name: string,
  email: string,
}

export interface region {
  id: number,
  name: string,
}

export interface genre {
  id: number,
  name: string,
}

export interface course {
  id: number,
  name: string,
  price: number,
  description: string,
}

export interface shop {
  id: number,
  representative_id: number,
  name: string,
  region: region,
  genre: genre,
  description: string,
  image: string,
  courses: course[],
  reservations?: reservation[],
  histories?: reservation[],
  reviews?: review[],
}

export interface review {
  id: number,
  rate: number,
  title: string,
  content: string,
}

export interface reservation {
  id: number,
  user: {
    id: number,
    name: string,
  }
  shop: shop,
  course?: course,
  review?: review,
  date: string,
  time: string,
  number: string,
  amount: number,
  visit_completed: number,
  advance_payment: number,
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
  name?: string,
  date: string,
  time: string,
  number: string,
  courses?: (course[] | undefined),
  selectedCourseIndex?: number,
  selectedReservationId?: number,
}

export interface newReview {
  rate: number,
  title: string,
  content: string,
  selectedHistoryId: number,
  selectedReviewId?: number,
  isNew: boolean,
}