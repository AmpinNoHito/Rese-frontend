<template>
  <div class="modal-common-style review-modal" @click.self="$hideModal('review'); initializeErrors()">
    <ReviewEditCard
      :newReview="newReview"
      :starClicked="starClicked"
      :titleChanged="titleChanged"
      :contentChanged="contentChanged"
      :registerReview="registerReview"
      :updateReview="updateReview"
      :deleteClicked="deleteClicked"
      :errors="errors"
      :initializeErrors="initializeErrors"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ReviewEditCard from '~/components/organisms/Card/ReviewEdit.vue';

export default Vue.extend({
  components: {
    ReviewEditCard,
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
