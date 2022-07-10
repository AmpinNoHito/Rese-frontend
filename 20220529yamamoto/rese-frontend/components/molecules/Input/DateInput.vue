<template>
  <div class="date-input">
    <InputAtom
      class="date-input__input"
      type="date"
      :value="dateValue"
      :min="$getTodaysDate()"
      :atInput="atInput"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import InputAtom from '~/components/atoms/Form/Input.vue';

export default Vue.extend({
  components: {
    InputAtom,
  },
  props: {
    dateValue: String,
    atInput: Function,
  },
});
</script>

<style lang="scss">
  .date-input {
    &__input {
      margin: 5px 0;
      padding: 2px;
      &::-webkit-calendar-picker-indicator {
        cursor: pointer;
      }

      @include mq() {
        margin: 5px 0;
        padding: 10px 2px;
        &::-webkit-calendar-picker-indicator {
          cursor: pointer;
        }
      }
    }
  }
</style>