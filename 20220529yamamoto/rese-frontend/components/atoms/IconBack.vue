<template>
  <span class="icon-back" @click="$router.back()">&lt;</span>
</template>

<style lang="scss">
.icon-back {
  cursor: pointer;
  display: inline-block;
  width: 1.2em;
  height: 1.2em;
  margin-right: 10px;
  background-color: #fff;
  border-radius: 3px;
  @include shadow(1);
  transform: translateY(-0.1em);
  @include flex();

  @include mq() {
    width: 2em;
    height: 2em;
    margin-right: 20px;
  }
}
</style>