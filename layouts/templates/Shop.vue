<template>
  <div class="shop-template">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'ShopTemplate',
}
</script>

<style lang="scss">
.shop-template {
  @include flex($jc: space-between, $ai: stretch);
  @include mq() {
    @include flex(column, $jc: center, $ai: stretch);
  }
}
</style>