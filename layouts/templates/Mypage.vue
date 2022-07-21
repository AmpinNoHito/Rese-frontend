<template>
  <div class="mypage-template">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'MypageTemplate',
}
</script>

<style lang="scss">
.mypage-template {
  width: 100%;
  margin: 0 auto;
  @include flex($ai: flex-start);
  margin-top: 100px;

  @include mq()  {
    @include flex(column-reverse);
    width: 100%;
    margin-top: 120px;
  }
}
</style>