import { Reservation, Shop, User } from "./api";

export interface UserResponse {
  data: {
    user: User,
  }
}

export interface tokenResponse {
  data: {
    token: string,
  }
}

export interface ShopCollectionResponse {
  data: {
    data: {
      shops: Shop[],
      shopIds: number[],
      regionIds: number[],
      genreIds: number[],
    }
  }
}

export interface ShopResponse {
  data: {
    data: Shop, 
  }
}

export interface ReservationCollectionResponse {
  data: {
    data: {
      reservations: Reservation[],
      histories: Reservation[],
    }
  }
}

export interface ReservationResponse {
  data: {
    data: Reservation,
  }
}

export interface NewReservationResponse {
  data: {
    newData: Reservation,
  }
}