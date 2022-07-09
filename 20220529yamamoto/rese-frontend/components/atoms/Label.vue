<template>
  <label :for="targetId">{{label}}</label>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    targetId: String,
    label: String,
  },
});
</script>
