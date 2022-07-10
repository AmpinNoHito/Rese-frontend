<template>
  <div class="selector-group">
    <ParagraphAtom class="selector-group__label" :text="'地域・ジャンル'"/>
    <BasicSelector
      class="selector-group__selector"
      :selectedId="selectedRegionId"
      :label="'地域を選択'"
      :options="$REGIONS"
      :changed="regionChanged"
    />
    <BasicSelector
      class="selector-group__selector"
      :selectedId="selectedGenreId"
      :label="'ジャンルを選択'"
      :options="$GENRES"
      :changed="genreChanged"
    />
    <ErrorAtom :errors="regionErrors"/>
    <ErrorAtom :errors="genreErrors"/>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import ParagraphAtom  from '~/components/atoms/Text/Paragraph.vue';
import ErrorAtom from '~/components/atoms/Text/Error.vue';
import BasicSelector from '~/components/molecules/SelectorUnit/BasicSelector.vue';

export default Vue.extend({
  components: {
    ParagraphAtom,
    BasicSelector,
    ErrorAtom,
  },
  props: {
    selectedRegionId: String,
    regionChanged: Function,
    regionErrors: Array,
    selectedGenreId: String,
    genreChanged: Function,
    genreErrors: Array,
  },
});
</script>

<style lang="scss">
.selector-group {
  flex-grow: 1;
  
  &__label {
    margin-bottom: 5px;
  }

  &__selector {
    width: 120px;
    margin-right: 10px;
    padding: 3px;
  }

  @include mq() {
    &__selector {
      padding: 10px 5px;

      &:last-of-type {
        margin-top: 10px;
      }
    }
  }
}
</style>