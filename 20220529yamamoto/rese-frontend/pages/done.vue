<template>
  <div>
    <div class="done">
    <p class="done__message">ご予約ありがとうございます。</p>
    <ButtonBasic
      v-if="$route.query.rs"
      class="done__button done__button--pay"
      @clicked="toPay">
      事前支払いはこちら
    </ButtonBasic>
    <ButtonBasic
      class="done__button done__button--back"
      @clicked="back">
      戻る
    </ButtonBasic>
  </div>
  </div>
</template>

<script>
  import auth from '~/middleware/auth';
  export default {
    middleware: [auth],
    methods: {
      toPay() {
        this.$router.push({path: '/pay', query: {rs: this.$route.query.rs}});
      },
      back() {
        /* クエリパラメータがあればマイページに遷移 */
        if (this.$route.query.ch) {
          this.$router.push('/mypage');
          return;
        }

        /* なければふたつ前のページに遷移 */
        this.$router.go(-2);
      }
    },
    mounted() {
      /* 予約が完了したら、$store.stateをクリアする */
      this.$store.dispatch('clearState');
    },
  };
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