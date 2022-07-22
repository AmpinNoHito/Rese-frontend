<template>
  <textarea cols="30" rows="6" :value="textValue" @input="atInput($event.target.value)"></textarea>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    textValue: String,
    atInput: Function,
  },
});
</script>