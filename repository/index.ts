import { Context, Plugin } from '@nuxt/types';
import { Inject } from '@nuxt/types/app';
import ShopRepository from "~/repository/shop/ShopRepository";
import FavoriteRepository from '~/repository/favorite/FavoriteRepository';
import ReservationRepository from '~/repository/reservation/ReservationRepository';
import ReviewRepository from '~/repository/review/ReviewRepository';
import UserRepository from '~/repository/user/UserRepository';
import CourseRepository from './course/CourseRepository';
import FavoriteRepositoryInterface from './favorite/FavoriteRepositoryInterface';
import ShopRepositoryInterface from './shop/ShopRepositoryInterface';
import ReservationRepositoryInterface from './reservation/ReservationRepositoryInterface';
import ReviewRepositoryInterface from './review/ReviewRepositoryInterface';
import UserRepositoryInterface from './user/UserRepositoryInterface';
import CourseRepositoryInterface from './course/CourseRepositoryInterface';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

export interface Repository {
  shop: ShopRepositoryInterface,
  favorite: FavoriteRepositoryInterface,
  reservation: ReservationRepositoryInterface,
  review: ReviewRepositoryInterface,
  user: UserRepositoryInterface,
  course: CourseRepositoryInterface,
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

function getShopRepository(axios: NuxtAxiosInstance): ShopRepositoryInterface {
  return new ShopRepository(axios);
}

function getFavoriteRepository(axios: NuxtAxiosInstance): FavoriteRepositoryInterface {
  return new FavoriteRepository(axios);
}

function getReservationRepository(axios: NuxtAxiosInstance): ReservationRepositoryInterface {
  return new ReservationRepository(axios);
}

function getReviewRepository(axios: NuxtAxiosInstance): ReviewRepositoryInterface {
  return new ReviewRepository(axios);
}

function getUserRepository(axios: NuxtAxiosInstance): UserRepositoryInterface {
  return new UserRepository(axios);
}

function getCourseRepository(axios: NuxtAxiosInstance): CourseRepositoryInterface {
  return new CourseRepository(axios);
}
