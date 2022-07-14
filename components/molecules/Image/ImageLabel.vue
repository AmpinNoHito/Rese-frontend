<template>
  <label class="image-label" :for="targetId">
    <img class="image-label__img" :src="image">
  </label>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    targetId: String,
    image: String,
  },
});
</script>

<style lang="scss">
  .image-label {
    display: inline-block;
    width: 1.5em;
    height: 1.5em;
    margin-right: 10px;
    &__img {
      width: 100%;
      height: 100%;
    }
  }
</style>