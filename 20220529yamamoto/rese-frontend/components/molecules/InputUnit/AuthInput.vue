<template>
  <div class="auth-input">
    <ImageLabelAtom
      :targetId="id"
      :image="image"
    />
    <InputAtom
      class="auth-input__input"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :atInput="atInput"
    />
    <ErrorAtom :errors="errors"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ImageLabelAtom from '~/components/atoms/ImageLabel.vue';
import InputAtom from '~/components/atoms/Input.vue';
import ErrorAtom from '~/components/atoms/Error.vue';

export default Vue.extend({
  components: {
    ImageLabelAtom,
    InputAtom,
    ErrorAtom,
  },
  props: {
    id: String,
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