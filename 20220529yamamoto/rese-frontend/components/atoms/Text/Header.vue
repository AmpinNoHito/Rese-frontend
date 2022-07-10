<template>
  <p class="header">{{text}}<slot></slot></p>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    text: String,
  }
});
</script>

<style lang="scss">
  .header {
    font-weight: bold;
    font-size: $fz-mid-large;
    
    @include mq() {
      font-size: $fz-large;
    }
  }
</style>