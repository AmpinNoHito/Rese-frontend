import { Plugin } from '@nuxt/types';
import { Context, Inject } from "@nuxt/types/app";

declare module 'vue/types/vue' {
  interface Vue {
    $showModal(modifier: string): void,
    $hideModal(modifier: string): void,
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $showModal(modifier: string): void,
    $hideModal(modifier: string): void,
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $showModal(modifier: string): void,
    $hideModal(modifier: string): void,
  }
}

const modal: Plugin = (context: Context, inject: Inject) => {
  const showModal = (modalType: string): void => {
    const modal = document.querySelector(`.${modalType}-modal`) as HTMLElement;
    modal.classList.add('is-shown');
    context.app.$stopScroll();
  }

  const hideModal = (modalType: string): void => {
    const modal = document.querySelector(`.${modalType}-modal`) as HTMLElement;
    modal.classList.remove('is-shown');
    context.app.$restartScroll();
  }

  inject('showModal', showModal);
  inject('hideModal', hideModal);
};

export default modal;
