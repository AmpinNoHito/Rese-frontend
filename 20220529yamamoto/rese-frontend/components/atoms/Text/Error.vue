<template>
  <p class="error-message" v-if="(errors.length)">※{{errors[0]}}</p>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    errors: {
      type: Array,
      required: false,
      default: () => [],
    },
  }
});
</script>

<style lang="scss">
.error-message {
  width: 100%;
  color: $c-red;
  display: block;
  font-size: $fz-smallest;
  font-weight: bold;
  margin-top: 3px;
}
</style>