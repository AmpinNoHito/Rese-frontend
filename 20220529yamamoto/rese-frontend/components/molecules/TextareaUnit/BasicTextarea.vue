<template>
  <div class="basic-textarea">
    <TextareaAtom
      class="basic-textarea__textarea"
      type="text"
      :textValue="textValue"
      :atInput="atInput"
    />
    <ErrorAtom :errors="errors"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TextareaAtom from '~/components/atoms/Textarea.vue';
import ErrorAtom from '~/components/atoms/Error.vue';

export default Vue.extend({
  components: {
    TextareaAtom,
    ErrorAtom,
  },
  props: {
    textValue: String,
    atInput: Function,
    errors: Array,
  },
});
</script>

<style lang="scss">
.basic-textarea {
  margin-bottom: 10px;

  &__textarea {
    width: 100%;
    padding: 3px;
    &::placeholder {
      font-size: $fz-small;
    }
  }
}
</style>