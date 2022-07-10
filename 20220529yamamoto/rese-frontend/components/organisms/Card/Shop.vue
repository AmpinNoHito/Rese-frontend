<template>
  <div class="shop-card">
    <ShopCardImage
      :shopImage="shop.image"
      :clicked="() => linkClicked()"
    />
    <div class="shop-card__inner">
      <LinkAtom
        class="shop-card__shop-name"
        :to="`/shops/${shop.id}`"
        :text="shop.name"
      />
      <HashTag
        :regionName="shop.region.name"
        :regionId="`${shop.region.id}`"
        :regionTagClicked="regionTagClicked"
        :genreName="shop.genre.name"
        :genreId="`${shop.genre.id}`"
        :genreTagClicked="genreTagClicked"
        :searchFn="searchByTag"
      />
      <div class="shop-card__buttons">
        <ButtonAtom
          class="shop-card__link-button"
          :text="'詳しくみる'"
          :clicked="() => linkClicked()"
        />
        <FavoriteButton
          v-if="showHeart"
          :clicked="heartClicked"
          :isFavorited="isFavorited"
          :shopId="shop.id"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import LinkAtom from '~/components/atoms/Text/Link.vue';
import ButtonAtom from '~/components/atoms/Button/Button.vue';
import ShopCardImage from '~/components/molecules/ImageUnit/ShopCardImage.vue';
import HashTag from '~/components/molecules/TextUnit/HashTagUnit.vue';
import FavoriteButton from '~/components/molecules/Utils/FavoriteButton.vue';

export default Vue.extend({
  components: {
    LinkAtom,
    ButtonAtom,
    ShopCardImage,
    HashTag,
    FavoriteButton,
  },
  props: {
    shop: Object,
    searchByTag: {
      type: Boolean,
      required: false,
      default: false,
    },
    isFavorited: {
      type: Boolean,
      required: false,
      default: true,
    },
    showHeart: {
      type: Number,
      required: false,
      default: 0,
    },
    regionTagClicked: Function,
    genreTagClicked: Function,
    heartClicked: Function,
    linkClicked: Function,
  },
});
</script>

<style lang="scss">
.shop-card {
  border-radius: 5px;
  @include shadow(1);

  &__inner {
    padding: 10px;
    font-weight: bold;
  }

  &__shop-name {
    font-size: $fz-smaller;
  }

  &__buttons {
    @include flex($jc: space-between);
  }

  @include mq() {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;

    &__shop-name {
      font-size: $fz-normal;
    }

    &__link-button {
      width: 100%;
    }

    &__buttons {
      position: relative;
    }
  }
}
</style>