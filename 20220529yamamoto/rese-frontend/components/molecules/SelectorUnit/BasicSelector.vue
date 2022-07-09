<template>
  <SelectorAtom class="basic-selector" :changed="changed">
      <OptionLabelAtom
        :selectCondition="!selectedId"
        :label="label"
        :hidden="true"
      />
      <OptionAtom
        v-for="option in options"
        :key="option.id"
        :value="`${option.id}`"
        :selectCondition="option.id === +selectedId"
        :option="option.name"
      />
    </SelectorAtom>
</template>

<script lang="ts">
import Vue from 'vue';
import SelectorAtom from '~/components/atoms/Selector.vue';
import OptionLabelAtom from '~/components/atoms/OptionLabel.vue';
import OptionAtom  from '~/components/atoms/Option.vue';

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
    changed: Function,
  },
});
</script>

<style lang="scss">
  .basic-selector {
    cursor: pointer;
    @include replaceArrow();
  }
</style>