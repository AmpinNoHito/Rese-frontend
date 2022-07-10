<template>
  <div class="shop-image">
    <ImageAtom 
      class="shop-image__img"
      :src="shopImage"
      :alt="'店舗画像'"
      :cover="true"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ImageAtom from '~/components/atoms/Image/Image.vue';

export default Vue.extend({
  components: {
    ImageAtom,
  },
  props: {
    shopImage: String,
  },
});
</script>

<style lang="scss">
.shop-image {
  width: 100%;
  height: 250px;
  margin: 10px 0;
  text-align: center;
  &__img {
    height: 100%;
  }
}
</style>