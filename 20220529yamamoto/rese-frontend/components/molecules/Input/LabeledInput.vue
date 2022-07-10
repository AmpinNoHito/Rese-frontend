<template>
  <div class="labeled-input">
    <ParagraphAtom 
      class="labeled-input__label"
      :text="labelText"
    />
    <InputAtom
      class="labeled-input__input"
      type="text"
      :inputValue="inputValue"
      :atInput="atInput"
    />
    <ErrorAtom :errors="errors"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ParagraphAtom  from '~/components/atoms/Text/Paragraph.vue';
import InputAtom from '~/components/atoms/Form/Input.vue';
import ErrorAtom from '~/components/atoms/Text/Error.vue';

export default Vue.extend({
  components: {
    ParagraphAtom,
    InputAtom,
    ErrorAtom,
  },
  props: {
    labelText: String,
    inputValue: String,
    atInput: Function,
    errors: Array,
  },
});
</script>


<style lang="scss">
.labeled-input {
  &__label {
    margin-bottom: 5px;
  }
  
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