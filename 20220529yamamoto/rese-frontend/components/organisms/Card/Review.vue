<template>
  <div class="card-common-style review-card">
    <CrossAtom class="card-common-style__cross" :clicked="() => $hideModal('review')"/>
    <HeaderAtom :text="'レビュー'" class="card-common-style__header"/>
    <RatingStars :rates="selectedReview.rate"/>
    <ParagraphAtom class="review-card__label" :text="'タイトル'"/>
    <ParagraphAtom class="review-card__title" :text="(selectedReview.title) ? selectedReview.title : 'タイトルなし'"/>
    <ParagraphAtom class="review-card__label" :text="'コメント'"/>
    <ParagraphAtom class="review-card__content" :text="(selectedReview.content) ? selectedReview.content : 'コメントなし'"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ParagraphAtom from '~/components/atoms/Text/Paragraph.vue';
import HeaderAtom from '~/components/atoms/Text/Header.vue';
import CrossAtom from '~/components/atoms/Icon/Cross.vue';
import ButtonAtom from '~/components/atoms/Button/Button.vue';
import CodeReader from '~/components/molecules/Utils/CodeReader.vue';
import RatingStars from '~/components/molecules/Utils/RatingStars.vue';

export default Vue.extend({
  components: {
    ParagraphAtom,
    HeaderAtom,
    CrossAtom,
    ButtonAtom,
    CodeReader,
    RatingStars,
  },
  props: {
    selectedReview: Object,
  },
});
</script>

<style lang="scss">
.review-card {
  &__label {
    width: 100%;
    margin-bottom: 5px;
  }

  &__title,
  &__content {
    width: 100%;
    color: #000;
    background-color: #fff;
    padding: 10px;
    border-radius: 5px;
  }

  &__title {
    margin-bottom: 20px;
  }

  &__content {
    min-height: 100px;
    max-height: 150px;
    overflow: auto;
    white-space: pre-wrap;
  }
}
</style>