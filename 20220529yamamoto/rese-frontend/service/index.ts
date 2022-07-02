import { Context, Plugin } from "@nuxt/types";
import { Inject } from "@nuxt/types/app";
import { NuxtAxiosInstance } from "@nuxtjs/axios";
import indexServiceInterface from "./index/indexServiceInterface";
import mypageServiceInterface from "./mypage/mypageServiceInterface";
import authServiceInterface from "./auth/authServiceInterface";
import shopServiceInterface from "./shop/shopServiceInterface";
import payServiceInterface from "./pay/payServiceInterface";
import adminIndexServiceInterface from "./adminIndex/adminIndexServiceInterface";
import adminShopServiceInterface from "./adminShop/adminShopServiceInterface";
import indexService from "./index/indexService";
import mypageService from "./mypage/mypageService";
import authService from "./auth/authService";
import shopService from "./shop/shopService";
import payService from "./pay/payService";
import adminIndexService from "./adminIndex/adminIndexService";
import adminShopService from "./adminShop/adminShopService";
import userRepository from "~/repository/user/userRepository";
import favoriteRepository from "~/repository/favorite/favoriteRepository";
import shopRepository from "~/repository/shop/shopRepository";
import reservationRepository from "~/repository/reservation/reservationRepository";
import courseRepository from "~/repository/course/courseRepository";
import reviewRepository from "~/repository/review/reviewRepository";

export interface Service {
  index: indexServiceInterface,
  mypage: mypageServiceInterface,
  auth: authServiceInterface,
  shop: shopServiceInterface
  pay: payServiceInterface,
  adminIndex: adminIndexServiceInterface,
  adminShop: adminShopServiceInterface,
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

function getIndexService(axios: NuxtAxiosInstance): indexServiceInterface {
  const shopRepositoryInstance = new shopRepository(axios);
  const favoriteRepositoryInstance = new favoriteRepository(axios);
  return new indexService(shopRepositoryInstance, favoriteRepositoryInstance);
}

function getMypageService(axios: NuxtAxiosInstance): mypageServiceInterface {
  const reservationRepositoryInstance = new reservationRepository(axios);
  const shopRepositoryInstance = new shopRepository(axios);
  const reviewRepositoryInstance = new reviewRepository(axios);
  const favoriteRepositoryInstance = new favoriteRepository(axios);
  return new mypageService(reservationRepositoryInstance, shopRepositoryInstance, reviewRepositoryInstance, favoriteRepositoryInstance);
}

function getAuthService(axios: NuxtAxiosInstance): authServiceInterface {
  const userRepositoryInstance = new userRepository(axios);
  return new authService(userRepositoryInstance);
}

function getShopService(axios: NuxtAxiosInstance): shopServiceInterface {
  const shopRepositoryInstance = new shopRepository(axios);
  const reservationRepositoryInstance = new reservationRepository(axios);
  return new shopService(shopRepositoryInstance, reservationRepositoryInstance);
}

function getPayService(axios: NuxtAxiosInstance): payServiceInterface {
  const reservationRepositoryInstance = new reservationRepository(axios);
  return new payService(reservationRepositoryInstance);
}

function getAdminIndexService(axios: NuxtAxiosInstance) {
  const shopRepositoryInstance = new shopRepository(axios);
  return new adminIndexService(shopRepositoryInstance);
}

function getAdminShopService(axios: NuxtAxiosInstance) {
  const shopRepositoryInstance = new shopRepository(axios);
  const courseRepositoryInstance = new courseRepository(axios);
  const reservationRepositoryInstance = new reservationRepository(axios);
  return new adminShopService(shopRepositoryInstance, courseRepositoryInstance, reservationRepositoryInstance);
}