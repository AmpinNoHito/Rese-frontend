<template>
  <div class="review-edit-card">
    <CrossAtom class="review-edit-card__cross" :clicked="() => {$hideModal('review'); initializeErrors}"/>
    <HeaderAtom class="card-common-style__header" :text="'レビュー新規投稿'"/>
    <RatingStars
      :pointer="true"
      :rates="newReview.rate"
      :starClicked="starClicked"
      :errorHandling="true"
      :errors="errors.rate"
    />
    <BasicInput 
      :inputValue="newReview.title"
      :atInput="titleChanged"
      :errors="errors.title"
    />
    <BasicTextarea
      :textValue="newReview.content"
      :atInput="contentChanged"
      :errors="errors.content"
    />
    <DarkButtonAtom
      class="review-edit-card__button"
      :text="'送信'"
      :clicked="registerClicked"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import HeaderAtom from '~/components/atoms/Text/Header.vue';
import CrossAtom from '~/components/atoms/Icon/Cross.vue';
import DarkButtonAtom from '~/components/atoms/Button/DarkButton.vue';
import RatingStars from '~/components/molecules/Utils/RatingStars.vue';
import BasicInput from '~/components/molecules/Input/BasicInput.vue';
import BasicTextarea from '~/components/molecules/Textarea/BasicTextarea.vue';

export default Vue.extend({
  components: {
    HeaderAtom,
    CrossAtom,
    DarkButtonAtom,
    RatingStars,
    BasicInput,
    BasicTextarea,
  },
  props: {
    newReview: Object,
    starClicked: Function,
    titleChanged: Function,
    contentChanged: Function,
    registerClicked: Function,
    errors: Object,
    initializeErrors: Function,
  },
});
</script>
