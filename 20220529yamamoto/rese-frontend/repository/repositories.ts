import { Context, Plugin } from '@nuxt/types';
import shopRepository from "~/repository/shopRepository";
import favoriteRepository from '~/repository/favoriteRepository';
import reservationRepository from '~/repository/reservationRepository';
import reviewRepository from '~/repository/reviewRepository';
import userRepository from '~/repository/userRepository';
import { Inject } from '@nuxt/types/app';

export interface Repositories {
  shop: shopRepository,
  favorite: favoriteRepository,
  reservation: reservationRepository,
  review: reviewRepository,
  user: userRepository,
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $repositories: Repositories,
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    readonly $repositories: Repositories,
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    readonly $repositories: Repositories,
  }
}

const repositories: Plugin = ({ $axios }: Context, inject: Inject) => {
  const shop = new shopRepository($axios);
  const favorite = new favoriteRepository($axios);
  const reservation = new reservationRepository($axios);
  const review = new reviewRepository($axios);
  const user = new userRepository($axios);
  const repositories: Repositories = {
    shop,
    favorite,
    reservation,
    review,
    user,
  }
  inject('repositories', repositories);
};

export default repositories;