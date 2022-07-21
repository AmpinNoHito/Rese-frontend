import { Plugin } from "@nuxt/types";
import { Context, Inject } from "@nuxt/types/app";

declare module 'vue/types/vue' {
  interface Vue {
    $getTodaysDate(): string,
    $stopScroll(): void
    $restartScroll(): void
    $processImage(e: Event): Promise<(string | undefined)>,
    $queryToString(value: string | (string | null)[] | undefined): string | undefined
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $getTodaysDate(): string,
    $stopScroll(): void
    $restartScroll(): void
    $processImage(e: Event): Promise<(string | undefined)>,
    $queryToString(value: string | (string | null)[] | undefined): string | undefined
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $getTodaysDate(): string,
    $stopScroll(): void
    $restartScroll(): void
    $processImage(e: Event): Promise<(string | undefined)>,
    $queryToString(value: string | (string | null)[] | undefined): string | undefined
  }
}

const utils: Plugin = (context: Context, inject: Inject) => {
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

  const processImage = async (e: Event): Promise<(string | undefined)> => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    
    if (!file) {  // ファイルが選択されなかった場合
      return undefined;
    }
  
    if (!file.type.match('image.*')) {  // 画像以外のファイルが選択された場合
      alert('画像ファイルを選択してください。');
      return undefined;
    }
  
    /* ファイルを画像として読み込む */
    const reader = new FileReader();
    reader.readAsDataURL(file);
    await new Promise<void>(resolve => reader.onload = () => resolve());
    const resultImage: string = reader.result as string;
    return resultImage;
  };

  const queryToString = (value: string | (string | null)[] | undefined): string | undefined => {
    return Array.isArray(value) ? value[0] || undefined : value;
  }

  inject('getTodaysDate', getTodaysDate);
  inject('stopScroll', stopScroll);
  inject('restartScroll', restartScroll);
  inject('processImage', processImage);
  inject('queryToString', queryToString);
}

export default utils;