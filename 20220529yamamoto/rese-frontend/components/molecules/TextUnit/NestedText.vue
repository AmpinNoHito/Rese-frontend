<template>
  <ParagraphAtom class="nested-p" :text="parentText">
    <SpanAtom class="nested-p__child" :text="childText"/>
    <slot></slot>
  </ParagraphAtom>
</template>

<script lang="ts">
import Vue from 'vue';
import ParagraphAtom  from '~/components/atoms/Paragraph.vue';
import SpanAtom from '~/components/atoms/Span.vue';

export default Vue.extend({
  components: {
    ParagraphAtom,
    SpanAtom,
  },
  props: {
    parentText: String,
    childText: String,
  },
});
</script>

<style lang="scss">
.nested-p {
  margin: 10px 0;
  position: relative;

  &__child {
    position: absolute;
    left: 80px;
  }
}
</style>