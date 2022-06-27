import Vue from "vue";

Vue.mixin({
  methods: {
    initializeErrors() {
      /* エラーを初期化 */
      Object.keys(this.errors).forEach(key => {
        this.errors[key] = [];
      });
    },
    errorHandling(errorResponse) {
      const validationErrors = errorResponse?.data?.errors;
      const keys = Object.keys(this.errors);
      /* バリデーションエラーがない場合 */
      if (!validationErrors) {
        keys.forEach(key => {
          this.errors[key] = [];
        });
      } else {
        /* 各プロパティのエラーメッセージを取得 */
        keys.forEach(key => {
          this.errors[key] = (validationErrors[key]) ? validationErrors[key] : [];
        });
      }
      
      /* バリデーションエラーがあればリターン */
      const tempArr = keys.filter(key => this.errors[key].length);
      if (tempArr.length) return;

      /* なければそれ以外のエラーメッセージを表示 */
      this.alertErrorMessage(errorResponse);
    },
    alertErrorMessage(errorResponse) {
      const errorMessage = errorResponse?.data?.errorMessage;
      (errorMessage) ?
        alert(errorMessage) : 
        alert('予期せぬエラーが発生しました。時間をおいてから再度お試しください。');
    },
  }
});