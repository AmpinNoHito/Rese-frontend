<template>
  <div class="input">
    <label class="input__label" :for="inputId">
      <img :src="labelImage">
    </label>
    <input
      class="input__field"
      :type="inputType"
      :id="inputId"
      :placeholder="inputPlaceholder"
      :value="value"
      @input="$emit('input', $event.target.value)">
    <p class="error-message" v-if="(errors.length)">※{{errors[0]}}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    labelImage: String,
    inputType: String,
    inputId: String,
    inputPlaceholder: String,
    value: String,
    errors: Array,
  },
});
</script>

<style lang="scss">
.input {
  width: 100%;
  margin-bottom: 20px;
  @include flex();
  flex-wrap: wrap;

  &__label {
    display: inline-block;
    width: 1.5em;
    height: 1.5em;
    margin-right: 10px;
    & > img {
      width: 100%;
      height: 100%;
    }
  }

  &__field {
    display: block;
    flex-grow: 1;
    margin-top: 5px;
    border-bottom: 1.5px solid $c-tp--dark;
  }

  @include mq() {
    &__field {
      padding: 10px 0;
    }
  }
}
</style>