<template>
  <HeaderAtom class="header-unit" :text="headerText">
    <ClickableSpan
      class="header-unit__span"
      :text="spanText"
      :clicked="spanClicked"
    />
  </HeaderAtom>
</template>


<script lang="ts">
import Vue from 'vue';
import HeaderAtom from '~/components/atoms/Header.vue';
import ClickableSpan from '~/components/atoms/ClickableSpan.vue';

export default Vue.extend({
  components: {
    HeaderAtom,
    ClickableSpan,
  },
  props: {
    headerText: String,
    spanText: String,
    spanClicked: Function,
  },
});
</script>

<style lang="scss">
.header-unit {
  &__span {
    font-weight: normal;
    cursor: pointer;
    color: $c-blue;
    font-size: $fz-smaller;
    position: absolute;
    right: 0;
    @include mq() {
      font-size: $fz-smaller;
    }
  }
}
</style>