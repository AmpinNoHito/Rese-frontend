<template>
  <div class="shop-index">
    <form class="top__search-bar">
      <div class="top__select-wrapper">
        <SelectRegion
          class="top__select"
          :regions="regions"
          :admin="false"
          @changed="changeRegionSearchId($event)"
        />
        <SelectGenre
          class="top__select"
          :genres="genres"
          :admin="false"
          @changed="changeGenreSearchId($event)"
        />
      </div>
      <div class="top__input-wrapper">
        <img class="top__input-icon" src="~/assets/images/icon-search.png" alt="検索">
        <input
          class="top__input"
          type="text"
          placeholder="Search..."
          v-model="searchWord"
          @input="changeSearchWord"/>
      </div>
    </form>
    <p class="shop-index__message" v-if="!searchResults.length">該当する店舗はありません。</p>
    <div class="shop-index__shops">
      <CardShop
        v-for="(shop, index) in searchResults"
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

<script>
  export default {
    async asyncData({ $axios, store }) {
      /* 店舗一覧取得 */
      const resShops = await $axios.$get('/api/shops');
      const shops = resShops.data;

      /* 店舗が存在する地域のId一覧を配列に */
      const regions = [...new Set(shops.map(shop => shop.region.id))];

      /* 店舗が存在するジャンルのId一覧を配列に */
      const genres = [...new Set(shops.map(shop => shop.genre.id))];

      /* ログイン中であればお気に入り店舗のデータを取得 */
      const favoriteShopsId = [];
      if (store.state.user) {
        const resFavorites = await $axios.$get(`/api/shops/favorites/${store.state.user.id}`);
        const favoriteShops = resFavorites.data;
        
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
      };
    },
    data() {
      return {
        regionSearchId: this.$store.state.regionSearchId,
        genreSearchId: this.$store.state.genreSearchId,
        searchWord: this.$store.state.searchWord,
      }
    },
    methods: {
      async toggleFavorite(shopId) {
        const ch = this.favoriteShopsId.includes(shopId);
        if (ch) { //店舗が既にお気に入りに追加されている場合は削除
        try {
          await this.$axios.delete(`/api/favorites/${this.$store.state.user.id}/${shopId}`);
          this.favoriteShopsId = this.favoriteShopsId.filter(favoriteShopId => favoriteShopId !== shopId);
          } catch (error) {
            this.alertErrorMessage(error.response);
          }
        }
        else {  //店舗がまだお気に入りに追加されていない場合は追加
          try {
            const res = await this.$axios.post('/api/favorites', {
              user_id: this.$store.state.user.id,
              shop_id: shopId
            });
            this.favoriteShopsId.push(shopId);
          } catch (error) {
            this.alertErrorMessage(error.response);
          }
        }
      },
      changeRegionSearchId(value) {
        this.regionSearchId = +value;
        this.$store.commit('setRegionSearchId', this.regionSearchId);
        this.searchShops();
      },
      changeGenreSearchId(value) {
        this.genreSearchId = +value;
        this.$store.commit('setGenreSearchId', this.genreSearchId);
        this.searchShops();
      },
      changeSearchWord() {
        this.$store.commit('setSearchWord', this.searchWord);
        this.searchShops();
      },
      searchShops() {
        /* 検索ワード等がない場合は一覧を表示 */
        if (!this.regionSearchId && !this.genreSearchId && !this.searchWord) {
          this.searchResults = this.shops;
          return;
        } 

        let searchResults = [];

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
          searchResults = (searchResults.length) ? 
          /* 地域、ジャンルですでに絞り込まれている場合 */
          searchResults.filter(shop => ~shop.name.toUpperCase().indexOf(this.searchWord.toUpperCase())) :
          /* まだ絞り込まれていない場合 */
          this.shops.filter(shop => ~shop.name.toUpperCase().indexOf(this.searchWord.toUpperCase()));
        }

        /* 絞り込み結果をdataに反映 */
        this.searchResults = searchResults;
      },
      searchByRegionTag(value) {
        /* 現在検索キーとして選択されている地域と同じである場合は選択を解除 */
        if (+value === this.regionSearchId) {
          this.changeRegionSearchId(0);
          return;
        }
        this.changeRegionSearchId(value);
      },
      searchByGenreTag(value) {
        /* 現在検索キーとして選択されているジャンルと同じである場合は選択を解除 */
        if (+value === this.genreSearchId) {
          this.changeGenreSearchId(0);
          return;
        }
        this.changeGenreSearchId(value);
      },
    },
    mounted() {
      this.searchShops();
    },
  };
</script>

<style lang="scss">
  .top {
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
    .top {
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