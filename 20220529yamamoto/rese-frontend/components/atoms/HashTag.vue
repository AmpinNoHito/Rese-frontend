<template>
  <span :class="{'hash-tag': true, 'hash-tag--pointer': searchFn}" @click="clicked(id)">#{{tagName}}</span>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    tagName: String,
    searchFn: {
      type: Boolean,
      required: false,
      default: false,
    },
    id: String,
    clicked: {
      type: Function,
      required: false,
      default: () =>{},
    },
  },
});
</script>

<style lang="scss">
  .hash-tag {
    font-size: $fz-smallest;

    &--pointer {
      cursor: pointer;
    }

    @include mq() {
      font-size: $fz-smaller;
    }
  }
</style>