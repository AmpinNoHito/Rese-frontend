<template>
  <select @change="changed">
    <option value="" :selected="!selectedTime" hidden>時間を選択してください</option>
    <option value="10:00" :selected="selectedTime === '10:00'">10:00</option>
    <option value="10:30" :selected="selectedTime === '10:30'">10:30</option>
    <option value="11:00" :selected="selectedTime === '11:00'">11:00</option>
    <option value="11:30" :selected="selectedTime === '11:30'">11:30</option>
    <option value="12:00" :selected="selectedTime === '12:00'">12:00</option>
    <option value="12:30" :selected="selectedTime === '12:30'">12:30</option>
    <option value="13:00" :selected="selectedTime === '13:00'">13:00</option>
    <option value="13:30" :selected="selectedTime === '13:30'">13:30</option>
    <option value="14:00" :selected="selectedTime === '14:00'">14:00</option>
    <option value="14:30" :selected="selectedTime === '14:30'">14:30</option>
    <option value="15:00" :selected="selectedTime === '15:00'">15:00</option>
    <option value="15:30" :selected="selectedTime === '15:30'">15:30</option>
    <option value="16:00" :selected="selectedTime === '16:00'">16:00</option>
    <option value="17:00" :selected="selectedTime === '17:00'">17:00</option>
    <option value="17:30" :selected="selectedTime === '17:30'">17:30</option>
    <option value="18:00" :selected="selectedTime === '18:00'">18:00</option>
    <option value="18:30" :selected="selectedTime === '18:30'">18:30</option>
    <option value="19:00" :selected="selectedTime === '19:00'">19:00</option>
    <option value="19:30" :selected="selectedTime === '19:30'">19:30</option>
    <option value="20:00" :selected="selectedTime === '20:00'">20:00</option>
    <option value="20:30" :selected="selectedTime === '20:30'">20:30</option>
    <option value="21:00" :selected="selectedTime === '21:00'">21:00</option>
    <option value="21:30" :selected="selectedTime === '21:30'">21:30</option>
    <option value="22:00" :selected="selectedTime === '22:00'">22:00</option>
    <option value="22:30" :selected="selectedTime === '22:30'">22:30</option>
    <option value="23:00" :selected="selectedTime === '23:00'">23:00</option>
  </select>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {selectedTime: String},
  methods: {
    changed(e: Event): void {
      const target = e.target as HTMLInputElement;
      this.$emit('timeChanged', target.value);
    },
  },
});
</script>
