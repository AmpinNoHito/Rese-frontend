import { Course, Genre, Region, Reservation, Review, Shop, User } from "~/types/api";
import { NewReservationResponse, ReservationCollectionResponse, ReservationResponse, ShopCollectionResponse, ShopResponse, UserResponse } from "~/types/axiosResponse";

const REGION: Region = {
  id: 100,
  name: 'test',
}

const GENRE: Genre = {
  id: 100,
  name: 'test',
}

export const COURSE: Course = {
  id: 100,
  name: 'test',
  price: 10000,
  description: 'test',
}

export const USER: User = {
  id: 100,
  group: 1,
  name: 'test',
  email: 'test@ex.com',
};

export const SHOP: Shop = {
  id: 100,
  representative_id: 100,
  name: 'test',
  region: REGION,
  genre: GENRE,
  description: 'test',
  image: 'test',
  courses: [COURSE],
};

export const REVIEW: Review = {
  id: 100,
  rate: 5,
  title: 'test',
  content: 'test',
};

export const RESERVATION: Reservation = {
  id: 100,
  user: USER,
  shop: SHOP,
  date: '2023-01-01',
  time: '10:00',
  number: '1人',
  amount: 10000,
  course: COURSE,
  visit_completed: 0,
  advance_payment: 1,
};

export const HISTORY: Reservation = {
  id: 200,
  user: USER,
  shop: SHOP,
  date: '2023-01-02',
  time: '10:00',
  number: '1人',
  amount: 10000,
  visit_completed: 1,
  advance_payment: 1,
  review: REVIEW,
};

export const SHOP_WITH_RESERVATIONS: Shop = {
  ...SHOP,
  reservations: [RESERVATION],
  histories: [HISTORY],
}

/* モックメソッドの戻り値用変数 */
export const SHOP_RESPONSE: ShopResponse = {
  data: {
    data: SHOP,
  },
};

export const SHOP_RESPONSE_WITH_RESERVATIONS: ShopResponse = {
  data: {
    data: SHOP_WITH_RESERVATIONS,
  },
}

export const SHOP_COLLECTION_RESPONSE: ShopCollectionResponse = {
  data: {
    data: {
      shops: [SHOP],
      shopIds: [SHOP.id],
      regionIds: [SHOP.region.id],
      genreIds: [SHOP.genre.id],
    }
  }
};

export const NEW_RESERVATION_RESPONSE: NewReservationResponse = {
  data: {
    newData: RESERVATION,
  },
};

export const RESERVATION_RESPONSE: ReservationResponse = {
  data: {
    data: RESERVATION,
  },
};

export const RESERVATION_COLLECTION_RESPONSE: ReservationCollectionResponse = {
  data: {
    data: {
      reservations: [RESERVATION],
      histories: [HISTORY],
    }
  }
};

export const USER_RESPONSE: UserResponse = {
  data: {
    user: USER,
  },
};