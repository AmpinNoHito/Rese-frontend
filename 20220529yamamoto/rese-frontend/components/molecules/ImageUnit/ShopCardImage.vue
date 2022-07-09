<template>
  <div class="shop-card-image__wrapper" @click="clicked">
    <ImageAtom
      class="shop-card-image__img"
      :src="`${$config.storageUrl}/${shopImage}`"
      :alt="'店舗画像'"
      :cover="true"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ImageAtom from '~/components/atoms/Image.vue';

export default Vue.extend({
  components: {
    ImageAtom,
  },
  props: {
    shopImage: String,
    clicked: Function,
  },
});
</script>

<style lang="scss">
  .shop-card-image {
    &__wrapper {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      overflow: hidden;
      cursor: pointer;
      width: 100%;
    }

    &__img {
      height: 100px;
      @include mq() {
        height: 200px;
      }
    }
  }
</style>