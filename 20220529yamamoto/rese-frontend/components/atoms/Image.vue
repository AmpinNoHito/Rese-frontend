<template>
  <img :class="{'image-cover': cover, 'image-contain': contain}" :src="src" :alt="alt" @click="clicked">
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    src: {
      type: String,
    },
    alt: {
      type: String,
      required: false,
      default: '',
    },
    cover: {
      type: Boolean,
      required: false,
      default: false,
    },
    contain: {
      type: Boolean,
      required: false,
      default: false,
    },
    clicked: {
      type: Function,
      required: false,
      default: () => {},
    }
  }
});
</script>

<style lang="scss">
  .image-cover {
    width: 100%;
    object-fit: cover;
  }

  .image-contain {
    width: 100%;
    object-fit: contain;
  }
</style>