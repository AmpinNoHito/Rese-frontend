import { Context, Plugin } from '@nuxt/types';
import { Inject } from '@nuxt/types/app';
import shopRepository from "~/repository/shop/shopRepository";
import favoriteRepository from '~/repository/favorite/favoriteRepository';
import reservationRepository from '~/repository/reservation/reservationRepository';
import reviewRepository from '~/repository/review/reviewRepository';
import userRepository from '~/repository/user/userRepository';
import courseRepository from './course/courseRepository';
import favoriteRepositoryInterface from './favorite/favoriteRepositoryInterface';
import shopRepositoryInterface from './shop/shopRepositoryInterface';
import reservationRepositoryInterface from './reservation/reservationRepositoryInterface';
import reviewRepositoryInterface from './review/reviewRepositoryInterface';
import userRepositoryInterface from './user/userRepositoryInterface';
import courseRepositoryInterface from './course/courseRepositoryInterface';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

export interface Repository {
  shop: shopRepositoryInterface,
  favorite: favoriteRepositoryInterface,
  reservation: reservationRepositoryInterface,
  review: reviewRepositoryInterface,
  user: userRepositoryInterface,
  course: courseRepositoryInterface,
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $repository: Repository,
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    readonly $repository: Repository,
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    readonly $repository: Repository,
  }
}

const repository: Plugin = ({ $axios }: Context, inject: Inject) => {
  const repository: Repository = {
    shop: getShopRepository($axios),
    favorite: getFavoriteRepository($axios),
    reservation: getReservationRepository($axios),
    review: getReviewRepository($axios),
    user: getUserRepository($axios),
    course: getCourseRepository($axios),
  }
  
  inject('repository', repository);
};

export default repository;

function getShopRepository(axios: NuxtAxiosInstance): shopRepositoryInterface {
  return new shopRepository(axios);
}

function getFavoriteRepository(axios: NuxtAxiosInstance): favoriteRepositoryInterface {
  return new favoriteRepository(axios);
}

function getReservationRepository(axios: NuxtAxiosInstance): reservationRepositoryInterface {
  return new reservationRepository(axios);
}

function getReviewRepository(axios: NuxtAxiosInstance): reviewRepositoryInterface {
  return new reviewRepository(axios);
}

function getUserRepository(axios: NuxtAxiosInstance): userRepositoryInterface {
  return new userRepository(axios);
}

function getCourseRepository(axios: NuxtAxiosInstance): courseRepositoryInterface {
  return new courseRepository(axios);
}
