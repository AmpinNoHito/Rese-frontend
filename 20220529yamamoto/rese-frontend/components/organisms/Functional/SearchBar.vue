<template>
  <form class="search-bar">
    <div class="search-bar__selectors-wrapper">
      <SearchBarSelector
        :selectedId="$accessor.regionSearchId"
        :label="'All area'"
        :options="$REGIONS"
        :optionIdsToShow="regionIds"
        :changed="regionChanged"
      />
      <SearchBarSelector
        :selectedId="$accessor.genreSearchId"
        :label="'All genre'"
        :options="$GENRES"
        :optionIdsToShow="genreIds"
        :changed="genreChanged"
      />
    </div>
    <SearchInput
      :atInput="atInput"
    />
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import SearchBarSelector from '~/components/molecules/SelectorUnit/SearchBarSelectorUnit.vue';
import SearchInput from '~/components/molecules/InputUnit/SearchInput.vue';

export default Vue.extend({
  components: {
    SearchBarSelector,
    SearchInput,
  },
  props: {
    regionIds: Array,
    regionChanged: Function,
    genreIds: Array,
    genreChanged: Function,
    inputTarget: String,
    atInput: Function,
  },
});
</script>


<style lang="scss">
.search-bar {
  position: absolute;
  top: 30px;
  right: 30px;
  padding: 5px;
  background-color: #fff;
  border-radius: 3px;
  @include shadow(1);
  @include flex();

  @include mq() {
    @include flex(column-reverse);
    width: calc(100% - 60px);
    max-width: 500px;
    top: 100px;
    right: 0;
    left: 50%;
    transform: translateX(-50%);

    &__selectors-wrapper {
      width: 100%;
      @include flex();
      padding-top: 2px;
      padding-bottom: 2px;
      border-top: 0.2px solid $c-tp;
    }
  }
}
</style>