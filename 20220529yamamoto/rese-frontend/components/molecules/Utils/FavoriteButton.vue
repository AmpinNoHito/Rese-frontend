<template>
  <div class="icon-heart" @click="clicked(shopId)">
    <ImageAtom
      class="icon-heart__img"
      v-if="isFavorited"
      :cover="true"
      :src="require('~/assets/images/icon-heart.png')"
      :alt="'♥'"
    />
    <ImageAtom
      class="icon-heart__img"
      v-if="!isFavorited"
      :cover="true"
      :src="require('~/assets/images/icon-heart-gray.png')"
      :alt="'♡'"
    />
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import ImageAtom from '~/components/atoms/Image.vue';

export default Vue.extend({
  components: {
    ImageAtom,
  },
  props: {
    clicked: Function,
    isFavorited: Boolean,
    shopId: Number,
  },
});
</script>

<style lang="scss">
  .icon-heart {
    cursor: pointer;
    width: 25px;
    height: 25px;

    @include mq() {
      width: 35px;
      height: 35px;
      position: absolute;
      top: -45px;
      right: 0;
    }
  }
</style>