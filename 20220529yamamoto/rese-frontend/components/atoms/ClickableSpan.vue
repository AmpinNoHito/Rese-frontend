<template>
  <span
    @click="clicked">
    {{text}}
  </span>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    text: String,
    clicked: Function,
  }
});
</script>