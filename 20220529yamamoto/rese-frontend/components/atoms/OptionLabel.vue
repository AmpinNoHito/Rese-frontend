<template>
  <option
    value=""
    :selected="selectCondition"
    :hidden="hidden">
    {{label}}
  </option>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    selectCondition: Boolean,
    label: String,
    hidden: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
});
</script>

