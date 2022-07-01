import { Plugin } from "@nuxt/types";
import { Context, Inject } from "@nuxt/types/app";

declare module 'vue/types/vue' {
  interface Vue {
    $processImage(e: Event): Promise<[(string | undefined), (File | undefined)]>,
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $processImage(e: Event): Promise<[(string | undefined), (File | undefined)]>,
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $processImage(e: Event): Promise<[(string | undefined), (File | undefined)]>,
  }
}

const imageProcessing: Plugin = (context: Context, inject: Inject) => {
  const processImage = async (e: Event): Promise<[(string | undefined), (File | undefined)]> => {
    /* ファイルが選択されなかった場合は処理を中断 */
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (!file) {
      return [undefined, undefined];
    }
  
    /* 画像以外のファイルが選択された場合はアラート発出 */
    if (!file.type.match('image.*')) {
      alert('画像ファイルを選択してください。');
      return [undefined, undefined];
    }
  
    /* ファイルを画像として読み込んで表示 */
    const reader = new FileReader();
    reader.readAsDataURL(file);
    await new Promise<void>(resolve => reader.onload = () => resolve());
    const resultImage: string = reader.result as string;
    return [resultImage, file];
  };
  inject('processImage', processImage);
}

export default imageProcessing;