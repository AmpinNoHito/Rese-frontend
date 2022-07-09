<template>
  <SelectorAtom class="search-bar-selector" :changed="changed">
    <OptionLabelAtom
      :selectCondition="!selectedId"
      :label="label"
    />
    <OptionAtom
      v-for="option in options"
      :key="option.id"
      :value="`${option.id}`"
      :showCondition="optionIdsToShow.includes(option.id)"
      :selectCondition="option.id === +selectedId"
      :option="option.name"
    />
  </SelectorAtom>
</template>

<script lang="ts">
import Vue from 'vue'
import SelectorAtom from '~/components/atoms/Selector.vue';
import OptionLabelAtom from '~/components/atoms/OptionLabel.vue';
import OptionAtom from '~/components/atoms/Option.vue';

export default Vue.extend({
  components: {
    SelectorAtom,
    OptionLabelAtom,
    OptionAtom,
  },
  props: {
    selectedId: String,
    label: String,
    options: Array,
    optionIdsToShow: Array,
    changed: Function,
  },
});
</script>

<style lang="scss">
  .search-bar-selector {
    cursor: pointer;
    font-size: $fz-smaller;
    padding: 0 5px;
    width: 100px;
    border-right: 0.2px solid $c-tp;
    @include replaceArrow();
    @include mq() {
      height: 40px;
      flex-grow: 1;
      &:last-of-type {
        border: none;
      }
    }
  }
</style>