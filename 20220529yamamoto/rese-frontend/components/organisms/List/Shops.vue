<template>
  <div :class="['shop-list', {'shop-list--representative': isRepresentative}]">
    <ShopCard
      v-for="shop in shops"
      :key="shop.id"
      :shop="shop"
      :searchByTag="searchByTag"
      :showHeart="showHeart"
      :isFavorited="isFavorited(shop.id)"
      :regionTagClicked="regionTagClicked"
      :genreTagClicked="genreTagClicked"
      :heartClicked="heartClicked"
      :linkClicked="() => linkClicked(shop.id)"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ShopCard from '~/components/organisms/Card/Shop.vue';

export default Vue.extend({
  components: {
    ShopCard,
  },
  props: {
    shops: Array,
    linkClicked: Function,
    searchByTag: Boolean,
    showHeart: Number,
    isFavorited: {
      type: Function,
      required: false,
      default: () => false,
    },
    regionTagClicked: Function,
    genreTagClicked: Function,
    heartClicked: Function,
    isRepresentative: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
});
</script>

<style lang="scss">
.shop-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px 10px;
  margin-top: 15px;

  @include mq() {
    margin-top: 180px;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 20px 0;
    &--representative {
      margin-top: 15px;
    }
  }
}
</style>