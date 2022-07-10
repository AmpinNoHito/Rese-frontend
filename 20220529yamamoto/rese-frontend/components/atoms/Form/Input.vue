<template>
  <input
    :value="inputValue"
    @input="atInput($event.target.value)"
    @change="changed($event)"
  />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    inputValue: {
      type: String,
      required: false,
      default: '',
    },
    atInput: {
      type: Function,
      required: false,
      default: () => {},
    },
    changed: {
      type: Function,
      required: false,
      default: () => {},
    }
  },
});
</script>