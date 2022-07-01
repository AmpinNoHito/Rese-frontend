<template>
  <div class="shop-index">
    <form class="home__search-bar">
      <div class="home__select-wrapper">
        <SelectRegion
          class="home__select"
          :regions="regions"
          :admin="false"
          @changed="changeRegionSearchId($event)"
        />
        <SelectGenre
          class="home__select"
          :genres="genres"
          :admin="false"
          @changed="changeGenreSearchId($event)"
        />
      </div>
      <div class="home__input-wrapper">
        <img class="home__input-icon" src="~/assets/images/icon-search.png" alt="検索">
        <input
          class="home__input"
          type="text"
          placeholder="Search..."
          v-model="searchWord"
          @input="changeSearchWord"/>
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
import { shop, user } from '~/types/api';
import { Context } from '@nuxt/types';

export default Vue.extend({
  async asyncData({ app: {$repositories, $accessor} }: Context) {
    /* 店舗一覧取得 */
    const shops = await $repositories.shop.index();

    /* 店舗が存在する地域のId一覧を配列に */
    const regions = [...new Set(shops.map(shop => shop.region.id))];

    /* 店舗が存在するジャンルのId一覧を配列に */
    const genres = [...new Set(shops.map(shop => shop.genre.id))];

    /* ログイン中であればお気に入り店舗のデータを取得 */
    const user = $accessor.user as user;
    const favoriteShopsId: number[] = [];
    if ($accessor.loggedIn) {
      const favoriteShops = await $repositories.shop.getFavoriteShops(user.id);
      
      /* お気に入りが店舗があればidを取得、配列に格納 */
      if (favoriteShops) {
        favoriteShops.forEach(favoriteShop => favoriteShopsId.push(favoriteShop.id));
      }
    }
    return {
      shops: shops,
      regions: regions,
      genres: genres,
      favoriteShopsId: favoriteShopsId,
      searchResults: shops,
      userId: ($accessor.loggedIn) ? user.id : 0 as number,
    };
  },
  data() {
    return {
      shops: [] as shop[],
      regions: 0 as number,
      genres: 0 as number,
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
      const ch = this.favoriteShopsId.includes(shopId);
      if (ch) { //店舗が既にお気に入りに追加されている場合は削除
      try {
        this.favoriteShopsId = this.favoriteShopsId.filter(favoriteShopId => favoriteShopId !== shopId);
        await this.$repositories.favorite.delete(this.userId, shopId);
        } catch (error: any) {
          this.favoriteShopsId.push(shopId);
          this.$alertErrorMessage(error.response);
        }
      }
      else {  //店舗がまだお気に入りに追加されていない場合は追加
        try {
          this.favoriteShopsId.push(shopId);
          await this.$repositories.favorite.register({
            user_id: this.userId,
            shop_id: shopId,
          });
        } catch (error: any) {
          this.favoriteShopsId = this.favoriteShopsId.filter(favoriteShopId => favoriteShopId !== shopId);
          this.$alertErrorMessage(error.response);
        }
      }
    },
    changeRegionSearchId(regionId: number):void {
      this.regionSearchId = regionId;
      this.$accessor.setRegionSearchId(this.regionSearchId);
      this.searchShops();
    },
    changeGenreSearchId(genreId: number):void {
      this.genreSearchId = genreId;
      this.$accessor.setGenreSearchId(this.genreSearchId);
      this.searchShops();
    },
    changeSearchWord(): void {
      this.$accessor.setSearchWord(this.searchWord);
      this.searchShops();
    },
    searchShops(): void {
      /* 検索ワード等がない場合は一覧を表示 */
      if (!this.regionSearchId && !this.genreSearchId && !this.searchWord) {
        this.searchResults = this.shops;
        return;
      } 

      let searchResults: shop[] = [];

      /* 地域で絞り込み */
      if (this.regionSearchId) {
        searchResults = this.shops.filter(shop => shop.region_id === this.regionSearchId);
      }
      
      /* ジャンルで絞り込み */
      if (this.genreSearchId) {
        searchResults = (searchResults.length) ? 
        /* 地域ですでに絞り込まれている場合 */
        searchResults.filter(shop => shop.genre_id === this.genreSearchId) :
        /* まだ絞り込まれていない場合 */
        this.shops.filter(shop => shop.genre_id === this.genreSearchId);
      }
      
      /* 検索ワードをもとに絞り込み */
      if (this.searchWord) {
        const searchWord: string = this.searchWord;
        searchResults = (searchResults.length) ? 
        /* 地域、ジャンルですでに絞り込まれている場合 */
        searchResults.filter(shop => ~shop.name.toUpperCase().indexOf(searchWord.toUpperCase())) :
        /* まだ絞り込まれていない場合 */
        this.shops.filter(shop => ~shop.name.toUpperCase().indexOf(searchWord.toUpperCase()));
      }

      /* 絞り込み結果をdataに反映 */
      this.searchResults = searchResults;
    },
    searchByRegionTag(value: number): void {
      /* 現在検索キーとして選択されている地域と同じである場合は選択を解除 */
      if (value === this.regionSearchId) {
        this.changeRegionSearchId(0);
        return;
      }
      this.changeRegionSearchId(value);
    },
    searchByGenreTag(value: number): void {
      /* 現在検索キーとして選択されているジャンルと同じである場合は選択を解除 */
      if (value === this.genreSearchId) {
        this.changeGenreSearchId(0);
        return;
      }
      this.changeGenreSearchId(value);
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