<template>
  <div class="review-edit-card">
    <CrossAtom class="review-edit-card__cross" :clicked="() => {$hideModal('review'); initializeErrors}"/>
    <HeaderAtom v-if="newReview.isNew" class="card-common-style__header" :text="'レビュー新規投稿'"/>
    <HeaderAtom v-if="!newReview.isNew" class="card-common-style__header" :text="'レビュー編集'"/>
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
      :clicked="newReview.isNew ? registerReview : updateReview"
    />
    <DarkButtonAtom
      v-if="!newReview.isNew"
      class="review-edit-card__button review-edit-card__button--delete"
      :text="'レビュー削除'"
      :clicked="deleteClicked"
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
    registerReview: Function,
    updateReview: Function,
    deleteClicked: Function,
    errors: Object,
    initializeErrors: Function,
  },
});
</script>

<style lang="scss">
.review-edit-card {
  @include flex(column, flex-start, stretch);
  color: #fff;
  background-color: $c-blue;
  width: 50%;
  min-height: 350px;
  height: fit-content;
  padding: 20px;
  border-radius: 5px;
  @include shadow(2);
  position: relative;

  &__cross {
    cursor: pointer;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 18px;
    right: 20px;
  }

  &__stars {
    text-align: center;
    margin: 20px 0;
  }

  &__star {
    cursor: pointer;
    margin: 5px;
    width: 25px;
    height: 25px;
  }

  &__button {
    &--delete {
      margin-top: 10px;
      color: #EF454A;
    }
  }

  @include mq() {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;

    &__cross {
      width: 30px;
      height: 30px;
    }

    &__star {
      width: 40px;
      height: 40px;
      margin: 5px;
    }
  }
}
</style>