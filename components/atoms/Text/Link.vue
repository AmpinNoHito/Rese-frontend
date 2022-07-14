<template>
  <nuxt-link :to="to">{{text}}</nuxt-link>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    text: String,
    to: String,
  },
});
</script>