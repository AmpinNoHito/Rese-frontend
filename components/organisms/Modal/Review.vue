<template>
  <div class="modal-common-style review-modal" @click.self="$hideModal('review')">
    <ReviewCard
      :selectedReview="selectedReview"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ReviewCard from '~/components/organisms/Card/Review.vue';

export default Vue.extend({
  components: {
    ReviewCard,
  },
  props: {
    selectedReview: Object,
  },
});
</script>
