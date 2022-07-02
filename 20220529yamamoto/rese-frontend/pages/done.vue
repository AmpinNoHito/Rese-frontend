<template>
  <div>
    <div class="done">
    <p class="done__message">ご予約ありがとうございます。</p>
    <ButtonBasic
      v-if="$route.query.rs"
      class="done__button done__button--pay"
      @clicked="$router.push({path: '/pay', query: {rs: $route.query.rs}})">
      事前支払いはこちら
    </ButtonBasic>
    <ButtonBasic
      class="done__button done__button--back"
      @clicked="$router.push('/')">
      戻る
    </ButtonBasic>
  </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import auth from '~/middleware/auth';

export default Vue.extend({
  middleware: [auth],
  mounted(): void {  // 予約完了時にいったん店舗検索条件をクリアする
    this.$accessor.clearSearchKeys();
  },
});
</script>

<style lang="scss">
.done {
  max-width: 400px;
  margin: 50px auto;
  background-color: #fff;
  padding: 30px;
  border-radius: 3px;
  @include shadow(2);
  @include flex(column);
  text-align: center;

  &__button {
    margin-top: 30px;
    &--back {
      margin-top: 10px;
    }
  }

  @include mq() {
    margin-top: 100px;
  }
}
</style>