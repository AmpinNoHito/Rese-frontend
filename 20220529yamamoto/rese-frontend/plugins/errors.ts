import { Plugin } from '@nuxt/types';
import { errors } from '~/types/errors';
import { Context, Inject } from "@nuxt/types/app";

declare module 'vue/types/vue' {
  interface Vue {
    $initializeErrors(errors: errors): void;
    $handleError(errors: errors, errorResponse: any): void
    $alertErrorMessage(errorResponse: any): void;
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $initializeErrors(errors: errors): void;
    $handleError(errors: errors, errorResponse: any): void
    $alertErrorMessage(errorResponse: any): void;
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $initializeErrors(errors: errors): void;
    $handleError(errors: errors, errorResponse: any): void
    $alertErrorMessage(errorResponse: any): void;
  }
}

const errors: Plugin = (context: Context, inject: Inject) => {
  /* エラーを初期化 */
  inject('initializeErrors', (errors: errors): void => {
    Object.keys(errors).forEach(key => {
      errors[key] = []; 
    });
  });
  
  /* エラーメッセージの表示 */
  inject('alertErrorMessage', (errorResponse: any): void => {
    const errorMessage: string = errorResponse?.data?.errorMessage;
    (errorMessage) ?
      alert(errorMessage) : 
      alert('予期せぬエラーが発生しました。時間をおいてから再度お試しください。');
  });

  /* バリデーションエラーの処理 */
  inject('handleError', (errors: errors, errorResponse: any): void => {
    const validationErrors: errors = errorResponse?.data?.errors;

    if (!validationErrors) {
      Object.keys(errors).forEach(key => {
        errors[key] = [];
      });
      context.app.$alertErrorMessage(errorResponse);
    } else {
      /* 各プロパティのエラーメッセージを取得 */
      Object.keys(errors).forEach(key => {
        errors[key] = validationErrors[key] ?? [];
      });
    }
  });
}

export default errors;