<template>
  <div class="code-reader">
    <qrcode-stream v-if="startingUp" @decode="decode" @init="init"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';


export default Vue.extend({
  props: {
    startingUp: Boolean,
    decode: Function,
    init: Function,
  }
});
</script>

<style lang="scss">
  .code-reader {
    margin: 0 auto;
    max-width: 400px;
    width: 100%;
    height: 80vh;
    margin-bottom: 10px;
  }
</style>