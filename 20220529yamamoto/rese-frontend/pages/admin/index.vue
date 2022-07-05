<template>
  <div class="shop-index">
    <p class="rep__header">
      登録店舗一覧
      <span class="rep__shop-register-button" @click="$showModal('shop')">
        新規店舗登録
      </span>
    </p>
    <p  v-if="!shops.length" class="shop-index__message shop-index__message--representative">店舗は登録されていません。</p>
    <div class="shop-index__shops shop-index__shops--representative">
      <CardShop
        v-for="shop in shops"
        :key="shop.id"
        :shopImage="shop.image"
        :shopName="shop.name"
        :shopRegion="shop.region.name"
        :shopGenre="shop.genre.name"
        :shopId="shop.id"
        :searchFunction="false"
        :showHeart="false"
        @linkClicked="$router.push(`/admin/shops/${shop.id}`)"/>
    </div>
    <div class="modal modal--shop" @click.self="$hideModal('shop')">
      <div class="modal__card modal__card--shop">
        <img
          class="modal__cross"
          src="~/assets/images/icon-cross.png"
          alt="×"
          @click="$hideModal('shop')"/>
        <p class="modal__header">
          新規店舗登録
        </p>
        <div class="modal__card-row">
          <div class="modal__texts">
            <div class="modal__item">
              <p class="modal__item-label">店名</p>
              <input class="modal__input" type="text" v-model="newShop.name">
              <p class="error-message" v-if="errors.name.length">※{{errors.name[0]}}</p>
            </div>
            <div class="modal__item">
              <p class="modal__item-label">店舗概要</p>
              <textarea class="modal__textarea" cols="30" rows="10" v-model="newShop.description"></textarea>
              <p class="error-message" v-if="errors.description.length">※{{errors.description[0]}}</p>
            </div>
          </div>
          <div class="modal__others">
            <div class="modal__item">
              <p class="modal__item-label">地域・ジャンル</p>
              <SelectRegion
                class="modal__select"
                :regions="[]"
                :admin="true"
                @changed="newShop.region_id = $event;"/>
              <SelectGenre
                class="modal__select"
                :genres="[]"
                :admin="true"
                @changed="newShop.genre_id = $event"/>
              <p class="error-message" v-if="errors.region_id.length">※{{errors.region_id[0]}}</p>
              <p class="error-message" v-if="errors.genre_id.length">※{{errors.genre_id[0]}}</p>
            </div>
            <div class="modal__item">
              <p class="modal__item-label">画像選択</p>
              <label class="modal__image-select" for="file">画像を選択する</label>
              <input type="file" id="file" @change="setImage" hidden>
              <div v-if="previewImage" class="modal__new-image">
                <img :src="previewImage"/>
              </div>
              <p class="error-message" v-if="errors.image.length">※{{errors.image[0]}}</p>
            </div>
          </div>
        </div>
        <ButtonBasic class="modal__button" @clicked="registerShop">新規登録</ButtonBasic>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { shop, newShop } from '~/types/api';
import representative from "~/middleware/representative";
import { errors } from '~/types/errors';
import { Context } from '@nuxt/types';
import { adminIndexData } from '~/types/pageData';

export default Vue.extend({
  middleware: [representative],
  async asyncData({ app }: Context) {
    return await app.$service.adminIndex.getData(app);
  },
  data() {
    return {
      shops: [],
      previewImage: undefined,
      /* 新規店舗登録用データ */
      newShop: {
        name: '',
        representative_id: 0,
        description: '',
        base64EncodedImage: undefined,
        region_id: 0,
        genre_id: 0,
      },
      errors: {
        name: [],
        description: [],
        image: [],
        region_id: [],
        genre_id: [],
      },
    } as adminIndexData;
  },
  methods: {
    async setImage(e: Event): Promise<void> {
      this.newShop.base64EncodedImage = this.previewImage = await this.$processImage(e);
    },
    async registerShop(): Promise<void> {      
      try {
        this.shops = await this.$service.adminIndex.registerShop(this.newShop);
        this.$hideModal('shop');
      } catch (error: any) {
        this.errors = this.$handleError(Object.keys(this.errors), error.response);
      }
    },
  },
});
</script>

<style lang="scss">
.rep {
  &__header {
    font-size: $fz-mid-large;
    position: relative;
    padding: 20px 0;
  }

  &__shop-register-button {
    cursor: pointer;
    color: $c-blue;
    font-size: $fz-smaller;
    position: absolute;
    right: 0;
    @include mq() {
      font-size: $fz-normal;
    }
  }
}
</style>