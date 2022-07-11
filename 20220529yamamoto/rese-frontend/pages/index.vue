<template>
  <IndexTemplate>
    <SearchBar
      :regionIds="regionIds"
      :regionChanged="value => {$accessor.setRegionSearchId(value); searchShops();}"
      :genreIds="genreIds"
      :genreChanged="value => {$accessor.setGenreSearchId(value); searchShops();}"
      :atInput="value => {searchWord = value; searchShops();}"
    />
    <ParagraphAtom
      class="index-template__message"
      v-if="!searchResults.length"
      :text="'該当する店舗はありません。'"
    />
    <ShopList
      :shops="searchResults"
      :searchByTag="true"
      :showHeart="$accessor.loggedIn"
      :isFavorited="(shopId) => favoriteShopIds.includes(shopId)"
      :regionTagClicked="value => {$accessor.setRegionSearchId(value); searchShops();}"
      :genreTagClicked="value => {$accessor.setGenreSearchId(value); searchShops();}"
      :heartClicked="toggleFavorite"
      :linkClicked="(shopId) => $router.push(`/shops/${shopId}`)"
    />
  </IndexTemplate>
</template>

<script lang="ts">
import Vue from 'vue';
import ParagraphAtom from '~/components/atoms/Text/Paragraph.vue';
import SearchBar from '~/components/organisms/Form/SearchBar.vue';
import ShopList from '~/components/organisms/List/Shops.vue';
import IndexTemplate from '~/layouts/templates/Index.vue';
import { Context } from '@nuxt/types';
import { indexData } from '~/types/pageData';

export default Vue.extend({
  components: {
    ParagraphAtom,
    SearchBar,
    ShopList,
    IndexTemplate,
  },
  async asyncData({ app }: Context) {
    return await app.$service.index.getData(app);
  },
  data() {
    return {
      shops: [],
      regionIds: [],
      genreIds: [],
      favoriteShopIds: [],
      searchResults: [],
      searchWord: '',
      userId: 0,
    } as indexData;
  },
  methods: {
    async toggleFavorite(shopId: number): Promise<void> {
      const res = await this.$service.index.toggleFavorite(this.favoriteShopIds, shopId, this.userId)
        .catch(error => {
          throw this.$alertErrorMessage(error.response);
        });
      
      this.favoriteShopIds = res;
    },
    searchShops(): void {
      this.searchResults = this.$service.index.searchShops(this.$accessor.regionSearchId, this.$accessor.genreSearchId, this.searchWord, this.shops);
    },
  },
  mounted() {
    this.searchShops();
  },
});
</script>
