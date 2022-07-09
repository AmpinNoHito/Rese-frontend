<template>
  <div class="review-rate">
    <ImageAtom
      :class="{'review-rate__star': true, 'review-rate__star--pointer': pointer}"
      :src="require('~/assets/images/star.svg')"
      :alt="'★'"
      v-for="(i, index) in rates"
      :key="index"
      :clicked="() => starClicked(i)"
    /><ImageAtom
      :class="{'review-rate__star': true, 'review-rate__star--pointer': pointer}"
      :src="require('~/assets/images/star-empty.svg')"
      :alt="'☆'"
      v-for="(i, index) in (5 - rates)"
      :key="index + rates"
      :clicked="() => starClicked(i + rates)"
    />
    <ErrorAtom :errors="errors"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ImageAtom from '~/components/atoms/Image.vue';
import ErrorAtom from '~/components/atoms/Error.vue';

export default Vue.extend({
  components: {
    ImageAtom,
    ErrorAtom,
  },
  props: {
    rates: Number,
    pointer: {
      type: Boolean,
      required: false,
      default: false,
    },
    starClicked: {
      type: Function,
    },
    errorHandling: {
      type: Boolean,
      required: false,
      default: false,
    },
    errors: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
});
</script>

<style lang="scss">
  .review-rate {
    text-align: center;
    margin: 20px 0;

    &__star {
      width: 25px;
      height: 25px;

      &--pointer {
        cursor: pointer;
      }
    }
  }
</style>