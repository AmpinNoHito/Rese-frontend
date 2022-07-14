<template>
    <div class="modal-common-style reservation-modal" @click.self="$hideModal('reservation'); initializeErrors();">
      <ReservationCard
        :shopName="shopName"
        :headerText="headerText"
        :buttonText="buttonText"
        :newReservation="newReservation"
        :atDateInput="atDateInput"
        :timeChanged="timeChanged"
        :numberChanged="numberChanged"
        :courseChanged="courseChanged"
        :buttonClicked="buttonClicked"
        :initializeErrors="initializeErrors"
        :errors="errors"
        :showCross="true"
      />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import ReservationCard from '~/components/organisms/Card/Reservation.vue';

export default Vue.extend({
  components: {
    ReservationCard,
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
  },
  data() {
    return {
      courses: this.newReservation.courses,
      date: this.newReservation.date,
      time: this.newReservation.time,
      number: this.newReservation.number,
      selectedCourseIndex: this.newReservation.selectedCourseIndex,
    }
  },
});
</script>
