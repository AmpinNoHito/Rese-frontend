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
        v-for="(shop, index) in shops"
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
              <input class="modal__input" type="text" v-model="shopSendData.name">
              <p class="error-message" v-if="errors.name.length">※{{errors.name[0]}}</p>
            </div>
            <div class="modal__item">
              <p class="modal__item-label">店舗概要</p>
              <textarea class="modal__textarea" cols="30" rows="10" v-model="shopSendData.description"></textarea>
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
                @changed="shopSendData.region_id = $event;"/>
              <SelectGenre
                class="modal__select"
                :genres="[]"
                :admin="true"
                @changed="shopSendData.genre_id = $event"/>
              <p class="error-message" v-if="errors.region_id.length">※{{errors.region_id[0]}}</p>
              <p class="error-message" v-if="errors.genre_id.length">※{{errors.genre_id[0]}}</p>
            </div>
            <div class="modal__item">
              <p class="modal__item-label">画像選択</p>
              <label class="modal__image-select" for="file">画像を選択する</label>
              <input type="file" id="file" @change="showImage" hidden>
              <div v-if="shopSendData.image" class="modal__new-image">
                <img :src="shopSendData.image"/>
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

<script>
  import representative from "~/middleware/representative";
  export default {
    middleware: [representative],
    async asyncData({ $axios, store }) {
      /* 登録店舗一覧取得 */
      const res = await $axios.$get(`/api/admin/shops/${store.state.user.id}`);
      const shops = res.data;

      return {
        shops: (shops) ? shops : [],
        file: '',
        /* 新規店舗登録用データ */
        shopSendData: {
          name: '',
          description: '',
          image: '',
          region_id: '',
          genre_id: '',
        },
        errors: {
          name: [],
          description: [],
          image: [],
          region_id: [],
          genre_id: [],
        }
      }
    },
    methods: {
      async registerShop() {
        /* 入力値から送信用データを作成 */
        const sendData = {
          name: this.shopSendData.name,
          representative_id: this.$store.state.user.id,
          description: this.shopSendData.description,
          region_id: this.shopSendData.region_id,
          genre_id: this.shopSendData.genre_id,
          base64EncodedImage: this.shopSendData.image,
        };
        
        try {
          /* 新規店舗登録処理 */
          await this.$axios.post('/api/admin/shops', sendData);
          alert('新規店舗が登録されました。');
          this.$hideModal('shop');
          location.reload();
        } catch (error) {
          this.errorHandling(error.response);
        }
      },
    },
  };
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