<template>
  <div class="card-common-style reservation-card">
    <CrossAtom
        class="reservation-card__cross"
        v-if="showCross"
        :clicked="() => {$hideModal('reservation'); initializeErrors()}"/>
    <HeaderAtom class="card-common-style__header" :text="headerText"/>
    <ReservationForm
      :newReservation="newReservation"
      :atDateInput="atDateInput"
      :timeChanged="timeChanged"
      :numberChanged="numberChanged"
      :courseChanged="courseChanged"
      :errors="errors"
    />
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
import NestedText from '~/components/molecules/TextUnit/NestedText.vue';
import ReservationForm from '~/components/organisms/Functional/ReservationForm.vue';

export default Vue.extend({
  components: {
    HeaderAtom,
    CrossAtom,
    EdgeButtonAtom,
    NestedText,
    ReservationForm,
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