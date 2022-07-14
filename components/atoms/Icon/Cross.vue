<template>
  <img
    src="~/assets/images/icon-cross.png"
    alt="×"
    @click="clicked"
  />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    clicked: Function,
  }
});
</script>

