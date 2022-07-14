<template>
  <div class="card-common-style reservation-card">
    <CrossAtom
        class="reservation-card__cross"
        v-if="showCross"
        :clicked="() => {$hideModal('reservation'); initializeErrors()}"/>
    <HeaderAtom class="card-common-style__header" :text="headerText"/>
    <form class="reservation-card__form">
      <DateInput
        :dateValue="newReservation.date"
        :atInput="atDateInput"
      />
      <ReservationSelector
        :label="'時間を選択してください'"
        :options="$TIMES"
        :selectedOption="newReservation.time"
        :changed="timeChanged"
        :errors="errors.datetime"
      />
      <ReservationSelector
        :label="'人数を選択してください'"
        :options="$NUMBERS"
        :selectedOption="newReservation.number"
        :changed="numberChanged"
        :errors="errors.number"
      />
      <ReservationSelector
        v-if="newReservation.courses.length"
        :selectCourse="true"
        :label="'コースを選択してください (任意)'"
        :options="newReservation.courses"
        :selectedOption="`${newReservation.selectedCourseIndex}`"
        :changed="courseChanged"
      />
    </form>
    <div class="reservation-card__confirmation">
      <NestedText
        class="reservation-card__confirmation-item"
        :parentText="'Shop'"
        :childText="shopName"
      />
      <NestedText
        class="reservation-card__confirmation-item"
        :parentText="'Date'"
        :childText="newReservation.date"
      />
      <NestedText
        class="reservation-card__confirmation-item"
        :parentText="'Time'"
        :childText="newReservation.time"
      />
      <NestedText
        class="reservation-card__confirmation-item"
        :parentText="'Number'"
        :childText="newReservation.number"
      />
      <NestedText
        v-if="newReservation.selectedCourseIndex !== undefined"
        class="reservation-card__confirmation-item"
        :parentText="'Course'"
        :childText="newReservation.courses[newReservation.selectedCourseIndex].name"
      />
      <NestedText
        v-if="newReservation.selectedCourseIndex !== undefined && newReservation.number"
        class="reservation-card__confirmation-item"
        :parentText="'Total'"
        :childText="`¥${newReservation.courses[newReservation.selectedCourseIndex].price * +newReservation.number.slice(0, -1)}`"
      />
    </div>
    <EdgeButtonAtom
      :text="buttonText"
      :clicked="buttonClicked"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import HeaderAtom from '~/components/atoms/Text/Header.vue';
import CrossAtom from '~/components/atoms/Icon/Cross.vue';
import EdgeButtonAtom from '~/components/atoms/Button/EdgeButton.vue';
import DateInput from '~/components/molecules/Input/DateInput.vue';
import ReservationSelector from '~/components/molecules/Selector/ReservationSelector.vue';
import NestedText from '~/components/molecules/Text/NestedText.vue';

export default Vue.extend({
  components: {
    HeaderAtom,
    CrossAtom,
    EdgeButtonAtom,
    DateInput,
    ReservationSelector,
    NestedText,
  },
  props: {
    shopName: String,
    headerText: String,
    buttonText: String,
    newReservation: Object,
    atDateInput: Function,
    timeChanged: Function, 
    numberChanged: Function, 
    courseChanged: Function,
    buttonClicked: Function,
    initializeErrors: Function,
    errors: Object,
    showCross: {
      type: Boolean,
      default: false,
    },
  },
});
</script>


<style lang="scss">
.reservation-card {
  max-height: none;
  height: fit-content;
  padding: 20px 20px 50px;

  &__form {
    width: 100%;
    @include flex(column, flex-start, stretch);
    margin-bottom: 10px;
  }

  &__confirmation {
    background-color: $c-blue--light;
    padding: 5px 15px;
    border-radius: 5px;
    width: 100%;
  }

  &__confirmation-item {
    font-size: $fz-smaller;
  }

  &__cross {
    cursor: pointer;
    width: 25px;
    height: 25px;
    position: absolute;
    top: 20px;
    right: 20px;
  }

  
  @include mq() {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding-bottom: 60px;

    &__confirmation-item {
      font-size: $fz-normal;
      margin: 20px 0;
    }

    &__button {
      height: 5em;
    }
  }
}
</style>