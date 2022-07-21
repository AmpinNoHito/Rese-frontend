<template>
  <div class="modal-common-style review-modal" @click.self="$hideModal('review'); initializeErrors()">
    <ReviewCreateCard
      v-show="newReview.isNew"
      :newReview="newReview"
      :starClicked="starClicked"
      :titleChanged="titleChanged"
      :contentChanged="contentChanged"
      :registerClicked="registerClicked"
      :errors="errors"
      :initializeErrors="initializeErrors"
    />
    <ReviewEditCard
      v-show="!newReview.isNew"
      :newReview="newReview"
      :starClicked="starClicked"
      :titleChanged="titleChanged"
      :contentChanged="contentChanged"
      :updateClicked="updateClicked"
      :deleteClicked="deleteClicked"
      :errors="errors"
      :initializeErrors="initializeErrors"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ReviewCreateCard from '~/components/organisms/Card/ReviewCreate.vue';
import ReviewEditCard from '~/components/organisms/Card/ReviewEdit.vue';

export default Vue.extend({
  components: {
    ReviewCreateCard,
    ReviewEditCard,
  },
  props: {
    newReview: Object,
    starClicked: Function,
    titleChanged: Function,
    contentChanged: Function,
    registerClicked: Function,
    updateClicked: Function,
    deleteClicked: Function,
    errors: Object,
    initializeErrors: Function,
  },
});
</script>
