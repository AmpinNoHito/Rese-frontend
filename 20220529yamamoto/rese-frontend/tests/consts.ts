import { course, genre, region, reservation, review, shop, user } from "~/types/api";
import { newReservationResponse, reservationCollectionResponse, shopCollectionResponse, shopResponse, userResponse } from "~/types/axiosResponse";

const REGION: region = {
  id: 100,
  name: 'test',
}

const GENRE: genre = {
  id: 100,
  name: 'test',
}

export const COURSE: course = {
  id: 100,
  name: 'test',
  price: 10000,
  description: 'test',
}

export const USER: user = {
  id: 100,
  group: 1,
  name: 'test',
  email: 'test@ex.com',
};

export const SHOP: shop = {
  id: 100,
  representative_id: 100,
  name: 'test',
  region: REGION,
  genre: GENRE,
  description: 'test',
  image: 'test',
  courses: [COURSE],
};

export const REVIEW: review = {
  id: 100,
  rate: 5,
  title: 'test',
  content: 'test',
};

export const RESERVATION: reservation = {
  id: 100,
  user: USER,
  shop: SHOP,
  date: '2023-01-01',
  time: '10:00',
  number: '1人',
  amount: 10000,
  visit_completed: 0,
  advance_payment: 1,
};

export const HISTORY: reservation = {
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

export const SHOP_WITH_RESERVATIONS: shop = {
  ...SHOP,
  reservations: [RESERVATION],
  histories: [HISTORY],
}

/* モックメソッドの戻り値用変数 */
export const SHOP_RESPONSE: shopResponse = {
  data: {
    data: SHOP,
  },
};

export const SHOP_RESPONSE_WITH_RESERVATIONS: shopResponse = {
  data: {
    data: SHOP_WITH_RESERVATIONS,
  },
}

export const SHOP_COLLECTION_RESPONSE: shopCollectionResponse = {
  data: {
    data: {
      shops: [SHOP],
      shopIds: [SHOP.id],
      regionIds: [SHOP.region.id],
      genreIds: [SHOP.genre.id],
    }
  }
};

export const NEW_RESERVATION_RESPONSE: newReservationResponse = {
  data: {
    newData: RESERVATION,
  },
};

export const RESERVATION_COLLECTION_RESPONSE: reservationCollectionResponse = {
  data: {
    data: {
      reservations: [RESERVATION],
      histories: [HISTORY],
    }
  }
};

export const USER_RESPONSE: userResponse = {
  data: {
    user: USER,
  },
};