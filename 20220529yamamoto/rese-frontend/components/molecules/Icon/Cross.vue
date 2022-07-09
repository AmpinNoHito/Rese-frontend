<template>
  <div class="icon-cross" @click="hideMenu">
    <SpanAtom class="icon-cross__cross" :text="'×'"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SpanAtom from '~/components/atoms/Span.vue';

export default Vue.extend({
  components: {
    SpanAtom,
  },
  props: {
    hideMenu: Function,
  },
});
</script>


<style lang="scss">
.icon-cross {
  cursor: pointer;
  width: 30px;
  height: 30px;
  background-color: $c-blue;
  border-radius: 5px;
  position: absolute;
  top: 30px;
  left: 30px;
  padding: 0;
  font-size: $fz-large;
  @include shadow(2);
  @include flex();

  &__cross {
    color: #fff;
    text-align: center;
  }
  
  @include mq() {
    width: 40px;
    height: 40px;
    padding: calc(8px * 4/3);
  }
}
</style>
