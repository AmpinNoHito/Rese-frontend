<template>
  <button class="dark-button" @click.prevent="clicked">{{text}}</button>
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

<style lang="scss">
.dark-button {
  cursor: pointer;
  color: #fff;
  background-color: $c-blue--dark;
  border: none;
  border-radius: 3px;
  padding: 5px 15px;
  @include hoverEffect();

  @include mq() {
    padding: 15px 40px;
  }
}
</style>