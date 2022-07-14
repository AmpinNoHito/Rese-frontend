<template>
  <IndexTemplate>
    <HeaderUnit
      :headerText="'登録店舗一覧'"
      :spanText="'新規店舗登録'"
      :spanClicked="() => $showModal('shop')"
    />
    <ParagraphAtom 
      v-if="!shops.length"
      class="index-template__message index-template__message--representative"
      :text="'店舗は登録されていません。'"
    />
    <ShopList
      :shops="shops"
      :isRepresentative="true"
      :linkClicked="(shopId) => $router.push(`/admin/shops/${shopId}`)"
    />
    <ShopEditModal
      :header="'新規店舗登録'"
      :newShop="newShop"
      :errors="errors"
      :atNameInput="(value) => newShop.name = value"
      :atDescriptionInput="(value) => newShop.description = value"
      :regionChanged="(value) => newShop.region_id = +value"
      :genreChanged="(value) => newShop.genre_id = +value"
      :previewImage="previewImage"
      :imageChanged="async function(e) {newShop.base64EncodedImage = previewImage = await $processImage(e)}"
      :buttonText="'新規登録'"
      :buttonClicked="registerShop"
    />
  </IndexTemplate>
</template>

<script lang="ts">
import Vue from 'vue';
import representative from '~/middleware/representative';
import ParagraphAtom from '~/components/atoms/Text/Paragraph.vue';
import HeaderUnit from '~/components/molecules/Text/Header.vue';
import ShopList from '~/components/organisms/List/Shops.vue';
import ShopEditModal from '~/components/organisms/Modal/ShopEdit.vue';
import IndexTemplate from '~/layouts/templates/Index.vue';
import { AdminIndexData } from '~/types/pageData';

export default Vue.extend({
  middleware: [representative],
  components: {
    ParagraphAtom,
    HeaderUnit,
    ShopList,
    ShopEditModal,
    IndexTemplate,
  },
  async asyncData({ app }) {
    const representativeId = app.$accessor.user.id;
    return await app.$service.adminIndex.getData(representativeId)
      .catch(error => app.$alertErrorMessage(error.response));
  },
  data() {
    return {
      shops: [],
      previewImage: undefined,
      /* 新規店舗登録用データ */
      newShop: {
        name: '',
        representative_id: 0,
        region_id: 0,
        genre_id: 0,
        description: '',
        base64EncodedImage: '',
      },
      errors: {
        name: [],
        description: [],
        image: [],
        region_id: [],
        genre_id: [],
      },
    } as AdminIndexData;
  },
  methods: {
    async registerShop(): Promise<void> {      
      const res = await this.$service.adminIndex.registerShop(this.newShop)
        .catch(error => {
          throw this.$handleError(this.errors, error.response);
        });
      
      this.shops = res;
      this.previewImage = undefined;
      this.$initializeErrors(this.errors);
      this.$hideModal('shop');
    },
  },
});
</script>
