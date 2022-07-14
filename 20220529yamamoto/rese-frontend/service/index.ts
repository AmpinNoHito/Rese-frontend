import { Context, Plugin } from "@nuxt/types";
import { Inject } from "@nuxt/types/app";
import { NuxtAxiosInstance } from "@nuxtjs/axios";
import IndexServiceInterface from "./index/IndexServiceInterface";
import MypageServiceInterface from "./mypage/MypageServiceInterface";
import AuthServiceInterface from "./auth/AuthServiceInterface";
import ShopServiceInterface from "./shop/ShopServiceInterface";
import PayServiceInterface from "./pay/PayServiceInterface";
import AdminIndexServiceInterface from "./adminIndex/AdminIndexServiceInterface";
import AdminShopServiceInterface from "./adminShop/AdminShopServiceInterface";
import IndexService from "./index/IndexService";
import MypageService from "./mypage/MypageService";
import AuthService from "./auth/AuthService";
import ShopService from "./shop/ShopService";
import PayService from "./pay/PayService";
import AdminIndexService from "./adminIndex/AdminIndexService";
import AdminShopService from "./adminShop/AdminShopService";
import UserRepository from "~/repository/user/UserRepository";
import FavoriteRepository from "~/repository/favorite/FavoriteRepository";
import ShopRepository from "~/repository/shop/ShopRepository";
import ReservationRepository from "~/repository/reservation/ReservationRepository";
import CourseRepository from "~/repository/course/CourseRepository";
import ReviewRepository from "~/repository/review/ReviewRepository";

export interface Service {
  index: IndexServiceInterface,
  mypage: MypageServiceInterface,
  auth: AuthServiceInterface,
  shop: ShopServiceInterface
  pay: PayServiceInterface,
  adminIndex: AdminIndexServiceInterface,
  adminShop: AdminShopServiceInterface,
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $service: Service,
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    readonly $service: Service,
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    readonly $service: Service,
  }
}
  
const service: Plugin = ({ $axios }: Context, inject: Inject): void => {
  const service: Service = {
    index: getIndexService($axios),
    mypage: getMypageService($axios),
    auth: getAuthService($axios),
    shop: getShopService($axios),
    pay: getPayService($axios),
    adminIndex: getAdminIndexService($axios),
    adminShop: getAdminShopService($axios),
  };
  inject('service', service);
}

export default service;

function getIndexService(axios: NuxtAxiosInstance): IndexServiceInterface {
  const shopRepositoryInstance = new ShopRepository(axios);
  const favoriteRepositoryInstance = new FavoriteRepository(axios);
  return new IndexService(shopRepositoryInstance, favoriteRepositoryInstance);
}

function getMypageService(axios: NuxtAxiosInstance): MypageServiceInterface {
  const reservationRepositoryInstance = new ReservationRepository(axios);
  const shopRepositoryInstance = new ShopRepository(axios);
  const reviewRepositoryInstance = new ReviewRepository(axios);
  const favoriteRepositoryInstance = new FavoriteRepository(axios);
  return new MypageService(reservationRepositoryInstance, shopRepositoryInstance, reviewRepositoryInstance, favoriteRepositoryInstance);
}

function getAuthService(axios: NuxtAxiosInstance): AuthServiceInterface {
  const userRepositoryInstance = new UserRepository(axios);
  return new AuthService(userRepositoryInstance);
}

function getShopService(axios: NuxtAxiosInstance): ShopServiceInterface {
  const shopRepositoryInstance = new ShopRepository(axios);
  const reservationRepositoryInstance = new ReservationRepository(axios);
  return new ShopService(shopRepositoryInstance, reservationRepositoryInstance);
}

function getPayService(axios: NuxtAxiosInstance): PayServiceInterface {
  const reservationRepositoryInstance = new ReservationRepository(axios);
  return new PayService(reservationRepositoryInstance);
}

function getAdminIndexService(axios: NuxtAxiosInstance) {
  const shopRepositoryInstance = new ShopRepository(axios);
  return new AdminIndexService(shopRepositoryInstance);
}

function getAdminShopService(axios: NuxtAxiosInstance) {
  const shopRepositoryInstance = new ShopRepository(axios);
  const courseRepositoryInstance = new CourseRepository(axios);
  const reservationRepositoryInstance = new ReservationRepository(axios);
  return new AdminShopService(shopRepositoryInstance, courseRepositoryInstance, reservationRepositoryInstance);
}