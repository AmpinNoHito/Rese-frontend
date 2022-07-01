<template>
  <button class="button-basic" @click.prevent="clicked">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    clicked(): void {
      this.$emit('clicked');
    }
  },
});
</script>

<style lang="scss">
.button-basic {
  cursor: pointer;
  color: #fff;
  background-color: $c-blue;
  border: none;
  border-radius: 3px;
  padding: 5px 15px;
  @include hoverEffect;

  @include mq() {
    padding: 15px 40px;
  }
}
</style>