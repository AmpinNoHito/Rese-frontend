<template>
  <div class="hash-tag-unit">
    <HashTagAtom
      :tagName="regionName"
      :id="regionId"
      :searchFn="searchFn"
      :clicked="regionTagClicked"
    />
    <HashTagAtom
      :tagName="genreName"
      :id="genreId"
      :searchFn="searchFn"
      :clicked="genreTagClicked"
    />
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import HashTagAtom from '~/components/atoms/HashTag.vue';

export default Vue.extend({
  components: {HashTagAtom},
  props: {
    regionName: String,
    regionId: String,
    regionTagClicked: Function,
    genreName: String,
    genreId: String,
    genreTagClicked: Function,
    searchFn: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
});
</script>

<style lang="scss">
  .hash-tag-unit {
    margin-bottom: 10px;

    @include mq() {
      margin: 10px 0 20px;
    }
  }
</style>