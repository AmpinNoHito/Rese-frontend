<template>
  <p>{{text}}<slot></slot></p>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    text: String,
  }
});
</script>