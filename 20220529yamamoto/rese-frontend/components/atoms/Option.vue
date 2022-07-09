<template>
  <option
    class="option"
    :value="value"
    v-if="showCondition"
    :selected="selectCondition">
    {{option}}
  </option>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: String,
    showCondition: {
      type: Boolean,
      required: false,
      default: true,
    },
    selectCondition: Boolean,
    option: String,
  },
});
</script>

<style lang="scss">
.option {
  @include mq() {
    height: 40px;
  }
}
</style>