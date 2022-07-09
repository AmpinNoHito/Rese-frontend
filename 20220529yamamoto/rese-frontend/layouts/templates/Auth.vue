<template>
  <div class="auth">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'Auth',
}
</script>

<style lang="scss">
.auth {
  margin: 50px auto 0;
  width: 80%;
  max-width: 500px;
  color: $c-blue;

  @include mq() {
    margin-top: 100px;
    width: 100%;
  }
}
</style>