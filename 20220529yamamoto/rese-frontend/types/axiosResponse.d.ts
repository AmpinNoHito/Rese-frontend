import { reservation, shop, user } from "./api";

export interface userResponse {
  data: {
    user: user,
  }
}

export interface tokenResponse {
  data: {
    token: string,
  }
}

export interface shopCollectionResponse {
  data: {
    data: {
      shops: shop[],
      shopIds: number[],
      regionIds: number[],
      genreIds: number[],
    }
  }
}

export interface shopResponse {
  data: {
    data: shop, 
  }
}

export interface reservationCollectionResponse {
  data: {
    data: {
      reservations: reservation[],
      histories: reservation[],
    }
  }
}

export interface reservationResponse {
  data: {
    data: reservation,
  }
}

export interface newReservationResponse {
  data: {
    newData: reservation,
  }
}