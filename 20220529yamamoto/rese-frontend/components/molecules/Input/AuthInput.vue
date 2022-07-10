<template>
  <div class="auth-input">
    <ImageLabel
      :targetId="id"
      :image="image"
    />
    <InputAtom
      class="auth-input__input"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :inputValue="inputValue"
      :atInput="atInput"
    />
    <ErrorAtom :errors="errors"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ImageLabel from '~/components/molecules/Image/ImageLabel.vue';
import InputAtom from '~/components/atoms/Form/Input.vue';
import ErrorAtom from '~/components/atoms/Text/Error.vue';

export default Vue.extend({
  components: {
    ImageLabel,
    InputAtom,
    ErrorAtom,
  },
  props: {
    id: String,
    inputValue: String,
    image: String,
    type: String,
    placeholder: String,
    errors: Array,
    atInput: Function,
  },
});
</script>



<style lang="scss">
.auth-input {
  width: 100%;
  margin-bottom: 20px;
  @include flex();
  flex-wrap: wrap;

  &__input {
    display: block;
    flex-grow: 1;
    margin-top: 5px;
    border-bottom: 1.5px solid $c-tp--dark;
  }

  @include mq() {
    &__input {
      padding: 10px 0;
    }
  }
}
</style>