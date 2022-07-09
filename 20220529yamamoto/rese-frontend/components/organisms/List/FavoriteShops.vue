<template>
  <div class="favorite-shop-list">
    <ParagraphAtom class="favorite-shop-list__username" :text="userName ? `${userName}さん` : ''"/>
    <HeaderAtom class="favorite-shop-list__header" :text="'お気に入り店舗'"/>
    <ParagraphAtom v-if="!favoriteShops.length" class="favorite-shop-list__message" :text="'お気に入り店舗はありません。'"/>
    <div class="favorite-shop-list__shops">
      <ShopCard
        class="favorite-shop-list__shop"
        v-for="(shop, index) in favoriteShops"
        :key="shop.id"
        :shop="shop"
        :showHeart="1"
        :heartClicked="() => heartClicked(index, shop.id)"
        :linkClicked="() => linkClicked(shop.id)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HeaderAtom from '~/components/atoms/Header.vue';
import ParagraphAtom from '~/components/atoms/Paragraph.vue';
import ShopCard from '~/components/organisms/Card/Shop.vue';

export default Vue.extend({
  components: {
    HeaderAtom,
    ParagraphAtom,
    ShopCard,
  },
  props: {
    userName: String,
    favoriteShops: Array,
    heartClicked: Function,
    linkClicked: Function,
  }
});
</script>

<style lang="scss">
.favorite-shop-list {
  width: 50%;
  position: relative;

  &__header {
    margin-bottom: 20px;
  }

  &__username {
    font-size: $fz-mid-large;
    font-weight: bold;
    position: absolute;
    top: -40px;
  }

  &__shops {
    @include flex($jc: space-between);
    flex-wrap: wrap;
  }

  &__shop {
    width: 47%;
    margin-bottom: 15px;
  }

  @include mq() {
    max-width: 500px;
    width: 100%;

    &__username {
      font-size: $fz-large;
      right: 0px;
      left: 0;
    }

    &__shop {
      width: 100%;
      margin-bottom: 15px;
    }

    &__message {
      font-size: $fz-small;
    }
  }
}
</style>