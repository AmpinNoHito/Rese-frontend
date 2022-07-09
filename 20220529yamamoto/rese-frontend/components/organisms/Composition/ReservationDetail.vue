<template>
  <div class="reservation-details">
    <ReservationList
      v-if="!showHistory"
      :isRepresentative="isRepresentative"
      :reservations="reservations"
      :toggleSwitchClicked="toggleSwitchClicked"
      :deleteButtonClicked="deleteButtonClicked"
      :payButtonClicked="payButtonClicked"
      :qrButtonClicked="qrButtonClicked"
      :codeReaderButtonClicked="codeReaderButtonClicked"
      :reservationButtonClicked="reservationButtonClicked"
    />
    <HistoryList
      v-if="showHistory"
      :isRepresentative="isRepresentative"
      :histories="histories"
      :toggleSwitchClicked="toggleSwitchClicked"
      :reviewButtonClicked="reviewButtonClicked"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ReservationList from '~/components/organisms/List/Reservations.vue';
import HistoryList from '~/components/organisms/List/Histories.vue';

export default Vue.extend({
  components: {
    ReservationList,
    HistoryList,
  },
  props: {
    reservations: Array,
    histories: Array,
    showHistory: Boolean,
    isRepresentative: Boolean,
    toggleSwitchClicked: Function,
    deleteButtonClicked: Function,
    payButtonClicked: Function,
    qrButtonClicked: Function,
    codeReaderButtonClicked: Function,
    reservationButtonClicked: Function,
    reviewButtonClicked: Function,
  },
});
</script>

<style lang="scss">
.reservation-details {
  margin: 0 auto;
  width: 50%;
  max-width: 400px;
  position: relative;

  @include mq()  {
    max-width: 500px;
    width: 100%;
    margin: 50px auto 0;
    padding-top: 15px;
    border-top: 0.2px solid $c-tp;
  }
}
</style>