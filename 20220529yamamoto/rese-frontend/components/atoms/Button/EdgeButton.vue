<template>
  <button class="edge-button" @click.prevent="clicked">{{text}}</button>
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
.edge-button {
  cursor: pointer;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  color: #fff;
  background-color: $c-blue--dark;
  border: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 3em;
  padding: 5px 15px;
  font-size: $fz-smaller;
  @include hoverEffect();

  @include mq() {
    font-size: $fz-small;
  }
}
</style>