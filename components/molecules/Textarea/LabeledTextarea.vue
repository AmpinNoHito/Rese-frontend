<template>
  <div class="labeled-textarea">
    <ParagraphAtom 
      class="labeled-textarea__label"
      :text="labelText"
    />
    <TextareaAtom
      class="labeled-textarea__textarea"
      type="text"
      :textValue="textValue"
      :atInput="atInput"
    />
    <ErrorAtom :errors="errors"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ParagraphAtom  from '~/components/atoms/Text/Paragraph.vue';
import TextareaAtom from '~/components/atoms/Form/Textarea.vue';
import ErrorAtom from '~/components/atoms/Text/Error.vue';

export default Vue.extend({
  components: {
    ParagraphAtom,
    TextareaAtom,
    ErrorAtom,
  },
  props: {
    labelText: String,
    textValue: String,
    atInput: Function,
    errors: Array,
  },
});
</script>

<style lang="scss">
.labeled-textarea {
  margin: 10px 0;
  flex-grow: 1;

  &__label {
    margin-bottom: 5px;
  }

  &__textarea {
    width: 100%;
  }
}
</style>