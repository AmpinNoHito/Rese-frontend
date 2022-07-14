<template>
  <DoneCard
    :query="$route.query.rs"
    :toPay="() => $router.push({ path: '/pay', query: { rs: $route.query.rs } })"
    :toHome="() => $router.push('/')"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import auth from '~/middleware/auth';
import DoneCard from '~/components/organisms/Card/Done.vue';

export default Vue.extend({
  middleware: [auth],
  components: {
    DoneCard,
  },
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

  &__message {
    line-height: 1.2em;
  }

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