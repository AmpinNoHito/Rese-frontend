<template>
  <div class="basic-input">
    <InputAtom
      class="basic-input__input"
      type="text"
      :inputValue="inputValue"
      :atInput="atInput"
    />
    <ErrorAtom :errors="errors"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import InputAtom from '~/components/atoms/Input.vue';
import ErrorAtom from '~/components/atoms/Error.vue';

export default Vue.extend({
  components: {
    InputAtom,
    ErrorAtom,
  },
  props: {
    inputValue: String,
    atInput: Function,
    errors: Array,
  },
});
</script>

<style lang="scss">
.basic-input {
  margin-bottom: 10px;

  &__input {
    width: 100%;
    padding: 3px;
    &::placeholder {
      font-size: $fz-smaller;
    }

    @include mq() {
      padding: 10px 5px;
    }
  }
}
</style>