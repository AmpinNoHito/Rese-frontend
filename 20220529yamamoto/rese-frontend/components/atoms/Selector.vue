<template>
  <select @change="changed($event.target.value)">
    <slot></slot>
  </select>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    changed: Function,
  },
});
</script>