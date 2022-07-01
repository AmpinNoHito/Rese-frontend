import { Plugin } from "@nuxt/types";
import { Context, Inject } from "@nuxt/types/app";

declare module 'vue/types/vue' {
  interface Vue {
    $setData(value: (string | number | undefined)): (string | number | undefined), 
    $getTodaysDate(): string,
    $stopScroll(): void
    $restartScroll(): void
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $setData(value: (string | number | undefined)): (string | number | undefined), 
    $getTodaysDate(): string,
    $stopScroll(): void
    $restartScroll(): void
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $setData(value: (string | number | undefined)): (string | number | undefined), 
    $getTodaysDate(): string,
    $stopScroll(): void
    $restartScroll(): void
  }
}

const utils: Plugin = (context: Context, inject: Inject) => {
  const setData = (value: (string | number | undefined)): (string | number | undefined) => {
    return value;
  }

  const getTodaysDate = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const today = `${year}-${month < 10 ? `0${month}` : month}-${date < 10 ? `0${date}` : date}`;
    return today;
  }

  const stopScroll = (): void => {
    const body = document.querySelector('body') as HTMLBodyElement;
    body.style.overflow = 'hidden';
  };

  const restartScroll = (): void => {
    const body = document.querySelector('body') as HTMLBodyElement;
    body.style.overflow = 'auto';
  };

  inject('setData', setData);
  inject('getTodaysDate', getTodaysDate);
  inject('stopScroll', stopScroll);
  inject('restartScroll', restartScroll);
}

export default utils;