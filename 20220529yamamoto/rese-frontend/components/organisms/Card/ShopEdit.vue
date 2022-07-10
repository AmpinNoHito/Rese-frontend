<template>
  <div class="card-common-style shop-edit-card">
    <CrossAtom class="card-common-style__cross" :clicked="() => $hideModal('shop')"/>
    <HeaderAtom class="card-common-style__header" :text="header"/>
    <div class="shop-edit-card__row">
      <div class="shop-edit-card__row-child">
        <LabeledInput
          :labelText="'店名'"
          :inputValue="newShop.name"
          :errors="errors.name"
          :atInput="atNameInput"
        />
        <LabeledTextarea
          :labelText="'店舗概要'"
          :textValue="newShop.description"
          :atInput="atDescriptionInput"
          :errors="errors.description"
        />
      </div>
      <div class="shop-edit-card__child">
        <SelectorGroup
          :selectedRegionId="`${newShop.region_id}`"
          :regionChanged="regionChanged"
          :regionErrors="errors.region_id"
          :selectedGenreId="`${newShop.genre_id}`"
          :genreChanged="genreChanged"
          :genreErrors="errors.genre_id"
        />
        <ImageInput
          :labelText="'画像選択'"
          :previewImage="previewImage"
          :changed="imageChanged"
          :errors="errors.image"
        />
      </div>
    </div>
    <ButtonAtom
      class="card-common-style__button"
      :text="buttonText"
      :clicked="buttonClicked"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CrossAtom from '~/components/atoms/Icon/Cross.vue';
import HeaderAtom from '~/components/atoms/Text/Header.vue';
import ButtonAtom from '~/components/atoms/Button/Button.vue';
import LabeledInput from '~/components/molecules/InputUnit/LabeledInput.vue';
import LabeledTextarea from '~/components/molecules/TextareaUnit/LabeledTextarea.vue';
import ImageInput from '~/components/molecules/InputUnit/ImageInput.vue';
import SelectorGroup from '~/components/organisms/Functional/SelectorGroup.vue';

export default Vue.extend({
  components: {
    CrossAtom,
    HeaderAtom,
    ButtonAtom,
    LabeledInput,
    LabeledTextarea,
    ImageInput,
    SelectorGroup,
  },
  props: {
    header: String,
    newShop: Object,
    errors: Object,
    atNameInput: Function,
    atDescriptionInput: Function,
    regionChanged: Function,
    genreChanged: Function,
    previewImage: String,
    imageChanged: Function,
    buttonText: String,
    buttonClicked: Function,
  }
});
</script>

<style lang="scss">
  .shop-edit-card {
    width: 70%;

    &__row {
      width: 100%;
      @include flex($jc: flex-start, $ai: flex-start);
      padding: 10px 0;
    }

    &__row-child {
      width: 50%;

      &:first-child {
        margin-right: 20px;
      }
    }

    @include mq() {
      &__row {
        width: 100%;
        @include flex(column, $ai: flex-start);
      }

      &__row-child {
        width: 100%;
      }
    }
  }
</style>