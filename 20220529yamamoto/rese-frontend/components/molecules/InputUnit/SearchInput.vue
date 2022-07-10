<template>
  <div class="search-input">
    <ImageAtom class="search-input__icon" :src="require('~/assets/images/icon-search.png')" :alt="'検索'"/>
    <InputAtom
      class="search-input__input"
      type="text"
      placeholder="Search..."
      :atInput="atInput"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ImageAtom from '~/components/atoms/Image/Image.vue';
import InputAtom from '~/components/atoms/Functional/Input.vue';

export default Vue.extend({
  components: {
    ImageAtom,
    InputAtom,
  },
  props: {
    atInput: Function,
  },
});
</script>

<style lang="scss">
  .search-input {
    @include flex();
    width: 200px;

    &__icon {
      width: 15px;
      height: 15px;
    }

    &__input {
      outline: none;
      border: none;
    }

    @include mq() {
      width: 100%;
      padding-top: 2px;
      padding-bottom: 2px;

      &__input {
        flex-grow: 1;
        height: 40px;
      }
    }
  }
</style>