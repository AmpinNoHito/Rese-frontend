<template>
  <div class="reservation-selector">
    <SelectorAtom class="reservation-selector__selector" :changed="changed">
      <OptionLabelAtom
        :selectCondition="!selectedOption"
        :label="label"
        :hidden="true"
      />
      <OptionAtom
        v-for="(option, index) in options"
        :key="selectCourse ? option.id : option"
        :option="selectCourse ? `${option.name} (¥${option.price})` : option"
        :selectCondition="selectCourse ? index === +selectedOption : option === selectedOption"
        :value="selectCourse ? `${index}` : option"
      />
    </SelectorAtom>
    <ErrorAtom :errors="errors"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SelectorAtom from '~/components/atoms/Selector.vue';
import OptionAtom from '~/components/atoms/Option.vue';
import OptionLabelAtom from '~/components/atoms/OptionLabel.vue';
import ErrorAtom from '~/components/atoms/Error.vue';

export default Vue.extend({
  components: {
    SelectorAtom,
    OptionAtom,
    OptionLabelAtom,
    ErrorAtom,
  },
  props: {
    label: String,
    options: Array,
    selectedOption: String,
    changed: Function,
    errors: Array,
    selectCourse: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
});
</script>

<style lang="scss">
  .reservation-selector {
    &__selector {
      cursor: pointer;
      margin: 5px 0;
      padding: 2px;
      width: 100%;
      @include replaceArrow();

      @include mq() {
        padding: 10px 2px;
      }
    }
  }
</style>