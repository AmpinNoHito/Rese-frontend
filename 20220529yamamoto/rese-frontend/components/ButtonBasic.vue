<template>
  <button class="button-basic" @click.prevent="clicked">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    methods: {
      clicked() {
        this.$emit('clicked');
      }
    },
  }
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