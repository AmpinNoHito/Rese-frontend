import Vue from "vue";

Vue.mixin({
  methods: {
    showImage(e) {
      /* ファイルが選択されなかった場合は処理を中断 */
      if (!e.target.files[0]) {
        this.shopSendData.image = '';
        return;
      }
    
      this.file = e.target.files[0];
      /* 画像以外のファイルが選択された場合はアラート発出 */
      if (!this.file.type.match('image.*')) {
        alert('画像ファイルを選択してください。');
        this.shopSendData.image = '';
        return;
      }
    
      /* ファイルを画像として読み込んで表示 */
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = e => {
        this.shopSendData.image = e.target.result;
        this.errors.image = [];
      };
    },
  },
});