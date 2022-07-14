<template>
  <div class="card-common-style course-edit-card">
    <CrossAtom class="card-common-style__cross" :clicked="() => {$hideModal('course'); initializeErrors()}"/>
    <HeaderAtom class="card-common-style__header" :text="'新規コース登録'"/>
    <div class="course-edit-card__row">
      <LabeledInput
        class="course-edit-card__row-child"
        :labelText="'コース名'"
        :inputValue="newCourse.name"
        :atInput="atNameInput"
        :errors="errors.name"
      />
      <LabeledInput
        class="course-edit-card__row-child"
        :labelText="'価格'"
        :inputValue="newCourse.price"
        :atInput="atPriceInput"
        :errors="errors.price"
      />
    </div>
    <LabeledTextarea
      :labelText="'コース概要'"
      :textValue="newCourse.description"
      :atInput="atDescriptionInput"
      :errors="errors.description"
    />
    <EdgeButtonAtom class="card-common-style__button" :text="'登録'" :clicked="buttonClicked"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ParagraphAtom from '~/components/atoms/Text/Paragraph.vue';
import HeaderAtom from '~/components/atoms/Text/Header.vue';
import CrossAtom from '~/components/atoms/Icon/Cross.vue';
import EdgeButtonAtom from '~/components/atoms/Button/EdgeButton.vue';
import RatingStars from '~/components/molecules/Utils/RatingStars.vue';
import LabeledInput from '~/components/molecules/Input/LabeledInput.vue';
import LabeledTextarea from '~/components/molecules/Textarea/LabeledTextarea.vue';

export default Vue.extend({
  components: {
    ParagraphAtom,
    HeaderAtom,
    CrossAtom,
    EdgeButtonAtom,
    RatingStars,
    LabeledInput,
    LabeledTextarea,
  },
  props: {
    newCourse: Object,
    atNameInput: Function,
    atPriceInput: Function,
    atDescriptionInput: Function,
    buttonClicked: Function,
    errors: Object,
    initializeErrors: Function,
  },
});
</script>

<style lang="scss">
.course-edit-card {
  padding-bottom: 50px;

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
    padding-bottom: 60px;

    &__row {
      width: 100%;
      @include flex(column, $ai: flex-start);
    }

    &__row-child {
      width: 100%;
      margin: 0;

      &:last-child {
        margin-top: 10px;
      }
    }
  }
}
</style>