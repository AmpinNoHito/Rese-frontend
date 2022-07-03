<template>
  <div class="shop-index">
    <form class="home__search-bar">
      <div class="home__select-wrapper">
        <SelectRegion
          class="home__select"
          :regions="regions"
          :admin="false"
          @changed="changeRegionSearchId($event); searchShops()"
        />
        <SelectGenre
          class="home__select"
          :genres="genres"
          :admin="false"
          @changed="changeGenreSearchId($event); searchShops()"
        />
      </div>
      <div class="home__input-wrapper">
        <img class="home__input-icon" src="~/assets/images/icon-search.png" alt="検索">
        <input
          class="home__input"
          type="text"
          placeholder="Search..."
          v-model="searchWord"
          @input="$accessor.setSearchWord(searchWord); searchShops()"
        />
      </div>
    </form>
    <p class="shop-index__message" v-if="!searchResults.length">該当する店舗はありません。</p>
    <div class="shop-index__shops">
      <CardShop
        v-for="shop in searchResults"
        :key="shop.id"
        :shopImage="shop.image"
        :shopName="shop.name"
        :shopRegion="shop.region.name"
        :shopGenre="shop.genre.name"
        :shopId="shop.id"
        :isFavorited="favoriteShopsId.includes(shop.id)"
        @linkClicked="$router.push(`/shops/${shop.id}`)"
        @regionClicked="searchByRegionTag(shop.region_id)"
        @genreClicked="searchByGenreTag(shop.genre_id)"
        @heartClicked="toggleFavorite(shop.id)"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { shop } from '~/types/api';
import { Context } from '@nuxt/types';

export default Vue.extend({
  async asyncData({ app }: Context) {
    return await app.$service.index.getData(app);
  },
  data() {
    return {
      shops: [] as shop[],
      regions: [] as number[],
      genres: [] as number[],
      favoriteShopsId: [] as number[],
      searchResults: [] as shop[],
      regionSearchId: this.$accessor.regionSearchId as (number | undefined),
      genreSearchId: this.$accessor.genreSearchId as (number | undefined),
      searchWord: this.$accessor.searchWord as (string | undefined),
      userId: 0 as number,
    }
  },
  methods: {
    async toggleFavorite(shopId: number): Promise<void> {
      try {
        this.favoriteShopsId = await this.$service.index.toggleFavorite(this.favoriteShopsId, shopId, this.userId);
      } catch (error: any) {
        this.$alertErrorMessage(error.response);
      }
    },
    searchShops(): void {
      this.searchResults = this.$service.index.searchShops(this.regionSearchId, this.genreSearchId, this.searchWord, this.shops);
    },
    changeRegionSearchId(regionId: number): void {
      this.regionSearchId = regionId;
      this.$accessor.setRegionSearchId(this.regionSearchId);
    },
    changeGenreSearchId(genreId: number): void {
      this.genreSearchId = genreId;
      this.$accessor.setGenreSearchId(this.genreSearchId);
    },
    searchByRegionTag(value: number): void {
      /* 現在検索キーとして選択されている地域と同じである場合は選択を解除 */
      (value !== this.regionSearchId) ?
        this.changeRegionSearchId(value) :
        this.changeRegionSearchId(0);
      this.searchShops();
    },
    searchByGenreTag(value: number): void {
      /* 現在検索キーとして選択されているジャンルと同じである場合は選択を解除 */
      (value !== this.genreSearchId) ?
        this.changeGenreSearchId(value) :
        this.changeGenreSearchId(0);
      this.searchShops()
    },
  },
  mounted() {
    this.searchShops();
  },
});
</script>

<style lang="scss">
.home {
  &__search-bar {
    position: absolute;
    top: 30px;
    right: 30px;
    padding: 5px;
    background-color: #fff;
    border-radius: 3px;
    @include shadow(1);
    @include flex()
  }

  &__input-wrapper {
    @include flex();
    width: 200px;
  }

  &__input-icon {
    width: 15px;
    height: 15px;
  }

  &__input {
    outline: none;
    border: none;
  }
  
  &__select {
    cursor: pointer;
    font-size: $fz-smaller;
    padding: 0 5px;
    width: 100px;
    border-right: 0.2px solid $c-tp;
    @include replaceArrow();
    @include mq() {
      flex-grow: 1;
      &:last-of-type {
        border: none;
      }
    }
  }
}

/* レスポンシブ */
@include mq() {
  .home {
    &__search-bar {
      @include flex(column-reverse);
      width: calc(100% - 60px);
      max-width: 500px;
      top: 100px;
      right: 0;
      left: 50%;
      transform: translateX(-50%);
    }

    &__select-wrapper,
    &__input-wrapper {
      width: 100%;
    }

    &__select-wrapper {
      @include flex();
      padding-top: 2px;
      padding-bottom: 2px;
      border-top: 0.2px solid $c-tp;
    }

    &__input-wrapper {
      padding-top: 2px;
      padding-bottom: 2px;
    }

    &__input {
      flex-grow: 1;
      height: 40px;
    }

    &__select {
      height: 40px;
    }
  }
}
</style>