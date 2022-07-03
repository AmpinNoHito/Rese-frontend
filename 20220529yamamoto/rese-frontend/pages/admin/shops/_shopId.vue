<template>
  <div class="individual-shop">
    <div class="individual-shop__detail">
      <div class="individual-shop__name-wrapper">
        <span class="individual-shop__back" @click="$router.back()">&lt;</span>
        <span class="individual-shop__name">{{shop.name}}
          <span class="rep__shop-edit-button" @click="$showModal('shop')">
            店舗情報編集
          </span>
        </span>
      </div>
      <div class="individual-shop__img">
        <img :src="`${$config.storageUrl}/${shop.image}`" alt="店舗画像">
      </div>
      <span class="individual-shop__region">#{{shop.region.name}}</span>
      <span class="individual-shop__genre">#{{shop.genre.name}}</span>
      <p class="individual-shop__description">{{shop.description}}</p>
      <p class="individual-shop__course-header">コース一覧<span class="rep__shop-edit-button" @click="$showModal('course')">新規コース登録</span></p>
      <p class="individual-shop__course" v-if="!courses.length">コースは登録されていません。</p>
      <div class="individual-shop__course" v-for="course in courses" :key="course.id">
        <p class="individual-shop__course-name">{{course.name}}
          <span class="individual-shop__course-price">¥{{course.price}}</span>
          <span class="rep__course-delete-button" @click="deleteCourse(course.id)">削除</span>
        </p>
        <p class="individual-shop__course-description">{{course.description}}</p>
      </div>
    </div>
    <ReservationDetails
      :reservations="reservations"
      :reservationsNum="reservations.length"
      :histories="histories"
      :historiesNum="histories.length"
      :showHistory="showHistory"
      :isRepresentative="true"
      @toggleSwitchClicked="showHistory = !showHistory;"
      @codeReaderButtonClicked="showCodeReader($event)"
      @reviewButtonClicked="selectedReview = $event.review; $showModal('review');"/>
    <div 
      class="modal modal--shop"
      @click.self="$hideModal('shop'); errors = $initializeErrors(Object.keys(errors));">
      <div class="modal__card modal__card--shop">
        <img
          class="modal__cross"
          src="~/assets/images/icon-cross.png"
          alt="×"
          @click="$hideModal('shop'); errors = $initializeErrors(Object.keys(errors));"/>
        <span class="modal__header">
          店舗情報編集
        </span>
        <div class="modal__card-row">
          <div class="modal__texts">
            <div class="modal__item">
              <p class="modal__item-label">店名</p>
              <input class="modal__input" type="text" :value="newShop.name" @change="changeName">
              <p class="error-message" v-if="errors.name.length">※{{errors.name[0]}}</p>
            </div>
            <div class="modal__item">
              <p class="modal__item-label">店舗概要</p>
              <textarea class="modal__textarea" cols="30" rows="10" :value="newShop.description" @change="changeDescription"></textarea>
              <p class="error-message" v-if="errors.description.length">※{{errors.description[0]}}</p>
            </div>
          </div>
          <div class="modal__others">
            <div class="modal__item">
              <p class="modal__item-label">地域・ジャンル</p>
              <SelectRegion
                class="modal__select"
                :regions="[newShop.region_id]"
                :admin="true"
                @changed="changeRegionId($event)"/>
              <SelectGenre
                class="modal__select"
                :genres="[newShop.genre_id]"
                :admin="true"
                @changed="changeGenreId($event)"/>
            </div>
            <div class="modal__item">
              <p class="modal__item-label">画像変更</p>
              <label class="modal__image-select" for="file">画像を変更する</label>
              <input type="file" id="file" @change="setImage" hidden>
              <div v-if="previewImage" class="modal__new-image">
                <img :src="previewImage"/>
              </div>
              <p class="error-message" v-if="errors.image.length">※{{errors.base64EncodedImage[0]}}</p>
            </div>
          </div>
        </div>
        <ButtonBasic class="modal__button" @clicked="updateShop">更新</ButtonBasic>
      </div>
    </div>
    <div
      class="modal modal--shop modal--course"
      @click.self="$hideModal('course'); errors = $initializeErrors(Object.keys(errors));">
      <div class="modal__card">
        <img
          class="modal__cross"
          src="~/assets/images/icon-cross.png"
          alt="×"
          @click="$hideModal('course'); errors = $initializeErrors(Object.keys(errors));"/>
        <span class="modal__header">
          新規コース登録
        </span>
        <div class="modal__card-row">
          <div class="modal__item">
            <p class="modal__item-label">コース名</p>
            <input class="modal__input" type="text" v-model="newCourse.name">
            <p class="error-message" v-if="errors.name.length">※{{errors.name[0]}}</p>
          </div>
          <div class="modal__item">
            <p class="modal__item-label">価格</p>
            <input class="modal__input" type="text" v-model="newCourse.price">
            <p class="error-message" v-if="errors.price.length">※{{errors.price[0]}}</p>
          </div>
        </div>
        <div class="modal__item">
          <p class="modal__item-label">コース概要</p>
          <textarea class="modal__textarea" cols="30" rows="10" v-model="newCourse.description"></textarea>
          <p class="error-message" v-if="errors.description.length">※{{errors.description[0]}}</p>
        </div>
        <ButtonBasic class="modal__button" @clicked="registerCourse">登録</ButtonBasic>
      </div>
    </div>
    <div class="modal modal--review" v-if="selectedReview" @click.self="$hideModal('review')">
      <div class="modal__card">
        <img
          class="modal__cross"
          src="~/assets/images/icon-cross.png"
          alt="×"
          @click="$hideModal('review')">
        <p class="modal__header">
          レビュー
        </p>
        <div class="modal__stars">
          <img
            class="modal__star"
            src="~/assets/images/star.svg"
            alt="★"
            v-for="(i, key) in selectedReview.rate"
            :key="key"
          ><img
            class="modal__star"
            src="~/assets/images/star-empty.svg"
            alt="☆"
            v-for="(i, key) in (5 - selectedReview.rate)"
            :key="key + selectedReview.rate">
        </div>
        <p class="modal__review-title-label">タイトル</p>
        <p class="modal__review-title">{{(selectedReview.title) ? selectedReview.title : 'タイトルなし'}}</p>
        <p class="modal__review-content-label">コメント</p>
        <p class="modal__review-content">{{(selectedReview.content) ? selectedReview.content : 'コメントなし'}}</p>
      </div>
    </div>
    <div class="code-reader modal--code-reader" @click.self="hideCodeReader">
      <div class="code-reader__inner">
        <qrcode-stream v-if="codeReader" @decode="registerVisit" @init="readQRCode"/>
      </div>
      <ButtonBasic class="code-reader__button" @clicked="hideCodeReader">戻る</ButtonBasic>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { shop, reservation, course, review, user, newCourse, newShop } from '~/types/api';
import { errors } from '~/types/errors';
import representative from '~/middleware/representative';

export default Vue.extend({
  middleware: [representative],
  async asyncData({ params, app: { $service, $accessor } }) {
    /* 店舗データ取得 */
    const representative = $accessor.user as user;
    return await $service.adminShop.getData(representative.id, +params.shopId);
  },
  data() {
    return {
      representativeId: 0 as number,
      shop: {} as shop,
      courses: [] as course[],
      reservations: [] as reservation[],
      histories: [] as reservation[],
      reviews: [] as review[],
      codeReader: false,
      selectedReview: undefined as (review | undefined),
      selectedReservation: {} as reservation,
      showHistory: false,
      previewImage: undefined as (string | undefined),
      newShop: { // 店舗情報更新用データ 
        name: '',
        description: '',
        base64EncodedImage: undefined,
        region_id: 0,
        genre_id: 0,
      } as newShop,
      newCourse: { // 新規コース登録用データ
        name: undefined as (string | undefined),
        price: undefined as (number | undefined),
        description: undefined as (string | undefined),
      } as newCourse,
      errors: {
        name: [],
        description: [],
        image: [],
        price: [],
      } as errors,
    }
  },
  methods: {
    async setImage(e: Event): Promise<void> { 
      this.newShop.base64EncodedImage = this.previewImage = await this.$processImage(e);
    },
    changeName(e: Event): void {
      const target = e.target as HTMLInputElement;
      this.newShop.name = target.value;
    },
    changeDescription(e: Event): void {
      const target = e.target as HTMLInputElement;
      this.newShop.description = target.value;
    },
    changeRegionId(value: number): void {
      this.newShop.region_id = value;
    },
    changeGenreId(value: number): void {
      this.newShop.genre_id = value;
    },
    async updateShop(): Promise<void> {
      try {
        this.shop = await this.$service.adminShop.updateShop(this.shop.id, this.newShop);
        this.errors = this.$initializeErrors(Object.keys(this.errors));
        this.$hideModal('shop');
      } catch (error: any) {
        this.errors = this.$handleError(Object.keys(this.errors), error.response);
      }
    },
    async registerCourse (): Promise<void> {
      try {
        [this.courses, this.newCourse] = await this.$service.adminShop.registerCourse(this.shop.id, this.newCourse);
        this.$hideModal('course');
      } catch (error: any) {
        this.errors = this.$handleError(Object.keys(this.errors), error.response);
      }
    },
    async deleteCourse(courseId: number): Promise<void> {
      try {
        this.courses = await this.$service.adminShop.deleteCourse(this.shop.id, courseId);
      } catch (error: any) {
        this.$alertErrorMessage(error.response);
      }
    },
    showCodeReader(reservation: reservation): void {
      this.selectedReservation = reservation;
      this.codeReader = true;
      this.$showModal('code-reader');
      this.$stopScroll();
    },
    hideCodeReader(): void {
      this.codeReader = false;
      this.$hideModal('code-reader');
      this.$restartScroll();
    },
    async readQRCode(promise: Promise<void>): Promise<void> {
      try {
        await promise;
      } catch (error) {
        alert('エラーが発生しました。デバイスのカメラ設定をご確認のうえ再度お試しください。');
        this.hideCodeReader();
      }
    },
    async registerVisit(decodedResult: string): Promise<void> {
      try {
        [this.reservations, this.histories] = await this.$service.adminShop.registerVisit(decodedResult, this.selectedReservation, this.representativeId);
      } catch (error: any) {
        this.$alertErrorMessage(error.response);
      }
      this.hideCodeReader();
    },
  },
});
</script>

<style lang="scss">
.rep {
  &__shop-edit-button {
    cursor: pointer;
    position: absolute;
    right: 0;
    color: $c-blue;
    font-size: $fz-smaller;
    font-weight: normal;
  }

  &__course-delete-button {
    cursor: pointer;
    position: absolute;
    right: 0;
    color: $c-red;
    
    @include mq() {
      font-size: $fz-mid-large;
    }
  }
}

.code-reader {
  @include modal();
  flex-direction: column;

  &__inner {
    margin: 0 auto;
    max-width: 400px;
    width: 100%;
    height: 80vh;
    margin-bottom: 10px;
  }

  &__button {
    margin: 0 auto;
  }
}
</style>