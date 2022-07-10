<template>
  <div class="image-input">
    <ParagraphAtom 
      class="image-input__label"
      :text="labelText"
    />
    <LabelAtom
      class="image-input__select-button"
      :targetId="'image-input'"
      :label="'画像を選択する'"
    />
    <InputAtom
      id="image-input"
      type="file"
      :changed="changed"
      hidden
    />
    <div v-if="previewImage" class="image-input__new-image">
      <ImageAtom
        :src="previewImage"
        :cover="true"
      />
    </div>
    <ErrorAtom :errors="errors"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ParagraphAtom  from '~/components/atoms/Text/Paragraph.vue';
import LabelAtom from '~/components/atoms/Text/Label.vue';
import InputAtom from '~/components/atoms/Functional/Input.vue';
import ImageAtom from '~/components/atoms/Image/Image.vue';
import ErrorAtom from '~/components/atoms/Text/Error.vue';

export default Vue.extend({
  components: {
    ParagraphAtom,
    LabelAtom,
    InputAtom,
    ImageAtom,
    ErrorAtom,
  },
  props: {
    labelText: String,
    previewImage: String,
    errors: Array,
    changed: Function,
  },
});
</script>

<style lang="scss">
.image-input {
  margin: 10px 0;
  flex-grow: 1;

  &__label {
    margin-bottom: 5px;
  }

  &__select-button {
    cursor: pointer;
    display: inline-block;
    font-size: $fz-smaller;
    background-color: #fff;
    color: #000;
    padding: 5px;
  }
  
  &__new-image {
    margin: 5px auto;
    height: 100px;
    @include flex();
    & > img {
      width: auto;
      height: 100%;
      object-fit: cover;
    }
  }

  @include mq() {
    &__select-button {
      padding: 10px 5px;
    }
  }
}
</style>