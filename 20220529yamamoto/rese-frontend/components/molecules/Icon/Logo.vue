<template>
  <div class="logo" @click="showMenu">
    <div class="logo__icon">
      <div class="logo__bar logo__bar--top"></div>
      <div class="logo__bar logo__bar--middle"></div>
      <div class="logo__bar logo__bar--bottom"></div>
    </div>
    <SpanAtom class="logo__text" :text="'Rese'"/>
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import SpanAtom from '~/components/atoms/Text/Span.vue';

export default Vue.extend({
  components: {
    SpanAtom,
  },
  props: {
    showMenu: Function,
  },
});
</script>

<style lang="scss">
.logo {
  cursor: pointer;
  position: absolute;
  top: 30px;
  left: 30px;
  width: fit-content;
  z-index: 10;
  @include flex($jc: flex-start);

  &__icon {
    width: 30px;
    height: 30px;
    background-color: $c-blue;
    border-radius: 5px;
    padding: 8px;
    margin-right: 10px;
    @include shadow(2);
    @include flex(column, space-between, flex-start);
  }

  &__bar {
    height: 1px;
    background-color: #fff;
    &--top {
      width: 60%;
    }
    &--middle {
      width: 100%;
    }
    &--bottom {
      width: 30%;
    }
  }

  &__text {
  font-weight: bold;
  font-size: $fz-large;
  color: $c-blue;
}

  @include mq() {
    &__icon {
      width: 40px;
      height: 40px;
      padding: calc(8px * 4/3);
    }

    &__text {
      font-size: $fz-largest;
    }
  }
}
</style>