<template>
  <select @change="changed">
    <option value="" :selected="!selectedNumber" hidden>人数を選択してください</option>
    <option value="1人" :selected="selectedNumber === '1人'">1人</option>
    <option value="2人" :selected="selectedNumber === '2人'">2人</option>
    <option value="3人" :selected="selectedNumber === '3人'">3人</option>
    <option value="4人" :selected="selectedNumber === '4人'">4人</option>
    <option value="5人" :selected="selectedNumber === '5人'">5人</option>
    <option value="6人" :selected="selectedNumber === '6人'">6人</option>
    <option value="7人" :selected="selectedNumber === '7人'">7人</option>
    <option value="8人" :selected="selectedNumber === '8人'">8人</option>
    <option value="9人" :selected="selectedNumber === '9人'">9人</option>
    <option value="10人" :selected="selectedNumber === '10人'">10人</option>
    <option value="11人" :selected="selectedNumber === '11人'">11人</option>
    <option value="12人" :selected="selectedNumber === '12人'">12人</option>
    <option value="13人" :selected="selectedNumber === '13人'">13人</option>
    <option value="14人" :selected="selectedNumber === '14人'">14人</option>
    <option value="15人" :selected="selectedNumber === '15人'">15人</option>
    <option value="16人" :selected="selectedNumber === '16人'">16人</option>
    <option value="17人" :selected="selectedNumber === '17人'">17人</option>
    <option value="18人" :selected="selectedNumber === '18人'">18人</option>
    <option value="19人" :selected="selectedNumber === '19人'">19人</option>
    <option value="20人" :selected="selectedNumber === '20人'">20人</option>
  </select>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    selectedNumber: String,
  },
  methods: {
    changed(e: Event): void {
      const target = e.target as HTMLInputElement;
      this.$emit('numberChanged', target.value);
    },
  },
});
</script>