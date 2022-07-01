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
              <input class="modal__input" type="text" :value="newShopData.name" @change="changeName">
              <p class="error-message" v-if="errors.name.length">※{{errors.name[0]}}</p>
            </div>
            <div class="modal__item">
              <p class="modal__item-label">店舗概要</p>
              <textarea class="modal__textarea" cols="30" rows="10" :value="newShopData.description" @change="changeDescription"></textarea>
              <p class="error-message" v-if="errors.description.length">※{{errors.description[0]}}</p>
            </div>
          </div>
          <div class="modal__others">
            <div class="modal__item">
              <p class="modal__item-label">地域・ジャンル</p>
              <SelectRegion
                class="modal__select"
                :regions="[shop.region_id]"
                :admin="true"
                @changed="changeRegionId($event)"/>
              <SelectGenre
                class="modal__select"
                :genres="[shop.genre_id]"
                :admin="true"
                @changed="changeGenreId($event)"/>
            </div>
            <div class="modal__item">
              <p class="modal__item-label">画像変更</p>
              <label class="modal__image-select" for="file">画像を変更する</label>
              <input type="file" id="file" @change="setImage" hidden>
              <div v-if="newShopData.image" class="modal__new-image">
                <img :src="newShopData.image"/>
              </div>
              <p class="error-message" v-if="errors.image.length">※{{errors.image[0]}}</p>
            </div>
          </div>
        </div>
        <ButtonBasic class="modal__button" @clicked="updateShopInfo">更新</ButtonBasic>
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
            <input class="modal__input" type="text" v-model="newCourseData.name">
            <p class="error-message" v-if="errors.name.length">※{{errors.name[0]}}</p>
          </div>
          <div class="modal__item">
            <p class="modal__item-label">価格</p>
            <input class="modal__input" type="text" v-model="newCourseData.price">
            <p class="error-message" v-if="errors.price.length">※{{errors.price[0]}}</p>
          </div>
        </div>
        <div class="modal__item">
          <p class="modal__item-label">コース概要</p>
          <textarea class="modal__textarea" cols="30" rows="10" v-model="newCourseData.description"></textarea>
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
    <div class="code-reader" @click.self="hideCodeReader">
      <div class="code-reader__inner">
        <qrcode-stream v-if="codeReader" @decode="onDecode" @init="onInit"/>
      </div>
      <ButtonBasic class="code-reader__button" @clicked="hideCodeReader">戻る</ButtonBasic>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { shop, reservation, course, review, sendData, user } from '~/types/api';
import { errorsObject } from '~/types/errors';
import representative from '~/middleware/representative';
type newCourseData = {
[key: string]: (string | number | undefined),
}

export default Vue.extend({
  middleware: [representative],
  async asyncData({ params, app: { $repositories, $accessor } }) {
    /* 店舗データ取得 */
    const representative = $accessor.user as user;
    const shop: shop = await $repositories.shop.getByIdAsRepresentative(+params.shopId, representative.id);
    /* 予約データがあれば */
    let reservations: reservation[] = [];
    let histories: reservation[] = [];
    if (shop?.reservations) {
      const sortedReservations: reservation[] = shop.reservations.sort((a, b) => (a.datetime < b.datetime) ? -1 : 1);
      /* まだ来店済みでない予約を配列に */
      reservations = sortedReservations.filter(reservation => reservation.visit_completed === 0);
      /* 来店済みの予約を配列に */
      histories = sortedReservations.filter(reservation => reservation.visit_completed === 1).reverse();
    }
    /* 過去の予約履歴があり */
    const reviews: review[] = [];
    if (histories?.length) {
      /* 予約履歴にレビューがついている場合 */
      histories.forEach(history => {
          if (history.review) {
              /* レビューを配列に */
              reviews.push(history.review);
          }
      });
    }
    return {
      representativeId: representative.id,
      shop: shop,
      courses: shop.courses ?? [],
      reservations: (reservations?.length) ? reservations : [],
      histories: (histories?.length) ? histories : [],
      reviews: (reviews?.length) ? reviews : [],
      selectedReview: reviews[0],
      /* 店舗情報更新用データ */
      newShopData: {
        name: shop.name,
        description: shop.description,
        regionId: shop.region_id,
        genreId: shop.genre_id,
      },
    };
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
      selectedReview: {} as review,
      selectedReservation: {} as reservation,
      showHistory: false,
      file: undefined as (File | undefined),
      newShopData: { // 店舗情報更新用データ 
        name: '' as string,
        description: '' as string,
        image: undefined as (string | undefined),
        regionId: undefined as (number | undefined),
        genreId: undefined as (number | undefined),
      },
      newCourseData: { // 新規コース登録用データ
        name: undefined as (string | undefined),
        price: undefined as (number | undefined),
        description: undefined as (string | undefined),
      } as newCourseData,
      errors: {
        name: [],
        description: [],
        image: [],
        price: [],
      } as errorsObject,
    }
  },
  methods: {
    async setImage(e: Event): Promise<void> {
      const result: [(string | undefined), (File | undefined)] = await this.$processImage(e);
      if (result[0] === undefined && result[1] === undefined) {
        return;
      } else {
        [this.newShopData.image, this.file] = result;
      }
    },
    changeName(e: Event): void {
      const target = e.target as HTMLInputElement;
      this.newShopData.name = target.value;
    },
    changeDescription(e: Event): void {
      const target = e.target as HTMLInputElement;
      this.newShopData.description = target.value;
    },
    changeRegionId(value: number): void {
      this.newShopData.regionId = value;
    },
    changeGenreId(value: number): void {
      this.newShopData.genreId = value;
    },
    async updateShopInfo(): Promise<void> {
      /* 入力値から送信用データを作成 */
      const sendData: sendData = {
        name: this.newShopData.name,
        description: this.newShopData.description,
        region_id: this.newShopData.regionId,
        genre_id: this.newShopData.genreId,
      };

      /* 新規画像はある場合のみ送信 */
      if (this.newShopData.image) {
        sendData.base64EncodedImage = this.newShopData.image;
      }
      
      try {
        /* 店舗情報変更処理 */
        await this.$axios.put(`/api/admin/shops/${this.shop.id}`, sendData);
        alert('店舗情報が変更されました。');
        this.errors = this.$initializeErrors(Object.keys(this.errors));
        this.updateDisplay();
        this.$hideModal('shop');
      } catch (error: any) {
        this.errors = this.$errorHandling(Object.keys(this.errors), error.response);
      }
    },
    async registerCourse (): Promise<void> {
      /* 入力値から送信用データを作成 */
      const sendData = {
        shop_id: this.shop.id,
        name: this.newCourseData.name,
        price: this.newCourseData.price,
        description: this.newCourseData.description,
      }

      try {
        /* 登録処理 */
        await this.$axios.post('/api/admin/courses', sendData);
        alert('コースが正常に登録されました。');
        this.errors = this.$initializeErrors(Object.keys(this.errors));
        Object.keys(this.newCourseData).forEach((key: string) => this.newCourseData[key] = undefined);
        this.updateDisplay();
        this.$hideModal('course');
      } catch (error: any) {
        console.log(error.response);
        this.errors = this.$errorHandling(Object.keys(this.errors), error.response);
      }
    },
    async deleteCourse(courseId: number): Promise<void> {
      /* 削除するか確認 */
      const ch = confirm('コースを削除しますか？');
      if (!ch) return;

      try {
        await this.$axios.delete(`/api/admin/courses/${courseId}`);
      } catch (error: any) {
        this.$alertErrorMessage(error.response);
      }

      this.updateDisplay();
    },
    async updateDisplay(): Promise<void> {
      const shop: shop = await this.$repositories.shop.getByIdAsRepresentative(+this.$route.params.shopId, this.representativeId);
      this.courses = (shop.courses) ?? [];

      if (this.shop?.reservations) {
        const sortedData: reservation[] = this.shop.reservations.sort((a, b) => (a.datetime < b.datetime) ? -1 : 1);
        /* まだ来店済みでない予約を配列に */
        this.reservations = sortedData.filter(reservation => reservation.visit_completed === 0);
        /* 来店済みの予約を配列に */
        this.histories = sortedData.filter(reservation => reservation.visit_completed === 1).reverse();
      }

    },
    showCodeReader(reservation: reservation): void {
      this.selectedReservation = reservation;
      this.codeReader = true;
      const modal = document.querySelector('.code-reader') as HTMLElement;
      modal.classList.add('is-shown');
      this.$stopScroll();
    },
    hideCodeReader(): void {
      const modal = document.querySelector('.code-reader') as HTMLElement;
      this.codeReader = false;
      modal.classList.remove('is-shown');
      this.$restartScroll();
    },
    async onInit(promise: Promise<void>): Promise<void> {
      try {
        await promise;
      } catch (error) {
        alert('エラーが発生しました。デバイスの設定をご確認のうえ再度お試しください。');
        this.hideCodeReader();
      }
    },
    onDecode(result: string): void {
      const ids: string[] = result.split(',');
      const reservationId: number = +ids[0];
      const userId: number = +ids[1];
      /* QRコードの情報と予約情報が一致しなければアラート発出 */
      if (this.selectedReservation.id !== reservationId || this.selectedReservation.user_id !== userId) {
        alert('予約情報がQRコードと一致しません。予約内容をご確認の上再度お試しください。');
        return;
      }
      
      /* 一致すれば来店処理 */
      this.completeVisit(reservationId);
    },
    async completeVisit(reservationId: number): Promise<void> {
      try {
        await this.$repositories.reservation.visit(reservationId);
        alert('来店処理が完了しました。');
        location.reload();
      } catch (error: any) {
        this.$alertErrorMessage(error.response);
      }

      this.hideCodeReader();
    }
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