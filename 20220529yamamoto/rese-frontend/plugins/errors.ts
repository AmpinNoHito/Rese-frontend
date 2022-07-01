import { Plugin } from '@nuxt/types';
import { errorsObject } from '~/types/errors';
import { Context, Inject } from "@nuxt/types/app";

declare module 'vue/types/vue' {
  interface Vue {
    $initializeErrors(keys: string[]): errorsObject;
    $errorHandling(keys: string[], errorResponse: any): errorsObject;
    $alertErrorMessage(errorResponse: any): void;
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $initializeErrors(keys: string[]): errorsObject;
    $errorHandling(keys: string[], errorResponse: any): errorsObject;
    $alertErrorMessage(errorResponse: any): void;
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $initializeErrors(keys: string[]): errorsObject;
    $errorHandling(keys: string[], errorResponse: any): errorsObject;
    $alertErrorMessage(errorResponse: any): void;
  }
}

const errors: Plugin = (context: Context, inject: Inject) => {
  /* エラーを初期化 */
  inject('initializeErrors', (keys: string[]): errorsObject => {
    let errors:errorsObject = {};
    keys.forEach(key => {
      errors[key] = []; 
    });
    return errors;
  });
  
  /* エラーメッセージの表示 */
  inject('alertErrorMessage', (errorResponse: any): void => {
    const errorMessage: string = errorResponse?.data?.errorMessage;
    (errorMessage) ?
      alert(errorMessage) : 
      alert('予期せぬエラーが発生しました。時間をおいてから再度お試しください。');
  });

  /* バリデーションエラーの処理 */
  inject('errorHandling', (keys: string[], errorResponse: any): errorsObject => {
    const validationErrors: errorsObject = errorResponse?.data?.errors;
    let errors:errorsObject = {};

    if (!validationErrors) {
      keys.forEach(key => {
        errors[key] = [];
      });
      context.app.$alertErrorMessage(errorResponse);
    } else {
      /* 各プロパティのエラーメッセージを取得 */
      keys.forEach(key => {
        errors[key] = validationErrors[key] ?? [];
      });
    }
    
    return errors;
  });
}

export default errors;