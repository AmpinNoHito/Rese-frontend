<template>
  <form class="reservation-form">
    <DateInput
      :dateValue="newReservation.date"
      :atInput="atDateInput"
    />
    <ReservationSelectorUnit
      :label="'時間を選択してください'"
      :options="$TIMES"
      :selectedOption="newReservation.time"
      :changed="timeChanged"
      :errors="errors.datetime"
    />
    <ReservationSelectorUnit
      :label="'人数を選択してください'"
      :options="$NUMBERS"
      :selectedOption="newReservation.number"
      :changed="numberChanged"
      :errors="errors.number"
    />
    <ReservationSelectorUnit
      v-if="newReservation.courses.length"
      :selectCourse="true"
      :label="'コースを選択してください (任意)'"
      :options="newReservation.courses"
      :selectedOption="`${newReservation.selectedCourseIndex}`"
      :changed="courseChanged"
    />
  </form>
</template>


<script lang="ts">
import Vue from "vue";
import DateInput from '~/components/molecules/InputUnit/DateInput.vue';
import ReservationSelectorUnit from '~/components/molecules/SelectorUnit/ReservationSelector.vue';

export default Vue.extend({
  components: {
    DateInput,
    ReservationSelectorUnit,
  },
  props: {
    newReservation: Object,
    timeChanged: Function, 
    numberChanged: Function, 
    courseChanged: Function,
    atDateInput: Function,
    errors: Object,
  },
});
</script>

<style lang="scss">
  .reservation-form {
    width: 100%;
    @include flex(column, flex-start, stretch);
    margin-bottom: 10px;
  }
</style>