import { Plugin } from '@nuxt/types';
import { errors } from '~/types/errors';
import { Context, Inject } from "@nuxt/types/app";

declare module 'vue/types/vue' {
  interface Vue {
    $initializeErrors(keys: string[]): errors;
    $handleError(keys: string[], errorResponse: any): errors;
    $alertErrorMessage(errorResponse: any): void;
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $initializeErrors(keys: string[]): errors;
    $handleError(keys: string[], errorResponse: any): errors;
    $alertErrorMessage(errorResponse: any): void;
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $initializeErrors(keys: string[]): errors;
    $handleError(keys: string[], errorResponse: any): errors;
    $alertErrorMessage(errorResponse: any): void;
  }
}

const errors: Plugin = (context: Context, inject: Inject) => {
  /* エラーを初期化 */
  inject('initializeErrors', (keys: string[]): errors => {
    let errors: errors = {};
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
  inject('handleError', (keys: string[], errorResponse: any): errors => {
    const validationErrors: errors = errorResponse?.data?.errors;
    let errors: errors = {};

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