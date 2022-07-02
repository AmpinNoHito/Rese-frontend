<template>
  <div class="mypage">
    <ReservationDetails
      :reservations="reservations"
      :reservationsNum="reservations.length"
      :histories="histories"
      :historiesNum="histories.length"
      :showHistory="showHistory"
      :isRepresentative="false"
      @toggleSwitchClicked="showHistory = !showHistory;"
      @deleteButtonClicked="deleteReservation($event)"
      @payButtonClicked="$router.push({path: '/pay', query: {rs: $event}})"
      @qrButtonClicked="showQRCode($event)"
      @reservationButtonClicked="showReservationModal($event)"
      @reviewButtonClicked="showReviewModal($event)"/>
    <div class="mypage__favorites">
      <p class="mypage__username">{{$accessor.user.name}}さん</p>
      <p class="mypage__header">お気に入り店舗</p>
      <p v-if="!favoriteShops.length" class="mypage__message">お気に入り店舗はありません。</p>
      <div class="mypage__favorites-list">
        <CardShop
          class="mypage__favorite"
          v-for="(shop, index) in favoriteShops"
          :key="shop.id"
          :shopImage="shop.image"
          :shopName="shop.name"
          :shopRegion="shop.region.name"
          :shopGenre="shop.genre.name"
          :shopId="shop.id"
          :isFavorited="true"
          :searchFunction="false"
          @linkClicked="$router.push(`/shops/${shop.id}`)"
          @heartClicked="deleteFavorite(index, shop.id)"/>
      </div>
    </div>
    <div class="modal modal--qr" @click.self="$hideModal('qr')">
      <div class="modal__card modal__card--qr">
        <img
          class="modal__cross"
          src="~/assets/images/icon-cross.png"
          alt="×"
          @click="$hideModal('qr')"/>
        <p class="modal__header modal__header--qr">来店確認用QRコード</p>
        <img v-if="qrcode" :src="qrcode" alt="QR" width="200" height="200">
      </div>
    </div>
    <div 
      class="modal modal--reservation"
      @click.self="hideModalAndInitErrors('reservation')">
      <CardReservation
        class="modal__reservation-card"
        v-if="newReservation.selectedReservationId"
        :date="newReservation.date"
        :today="today"
        :time="newReservation.time"
        :number="newReservation.number"
        :courses="newReservation.courses"
        :selectedCourseIndex="newReservation.selectedCourseIndex"
        :shopName="newReservation.name"
        :datetimeErrors="errors.datetime"
        :numberErrors="errors.number"
        :showCross="true"
        @dateChanged="newReservation.date = $setData($event)"
        @timeChanged="newReservation.time = $setData($event)"
        @courseChanged="newReservation.selectedCourseIndex = $setData($event)"
        @numberChanged="newReservation.number = $setData($event)"
        @buttonClicked="updateReservation"
        @crossClicked="hideModalAndInitErrors('reservation')">
        <template v-slot:header>予約変更</template>
        <template v-slot:button>変更する</template>
      </CardReservation>
    </div>
    <div class="modal modal--review" @click.self="hideModalAndInitErrors('review')">
      <CardReview
        class="modal__review-card"
        :rate="newReview.rate"
        :title="newReview.title"
        :content="newReview.content"
        :rateErrors="errors.rate"
        :titleErrors="errors.title"
        :contentErrors="errors.content"
        :isNewReview="newReview.isNew"
        @registerButtonClicked="registerReview"
        @updateButtonClicked="updateReview"
        @starClicked="newReview.rate = $setData($event)"
        @titleChanged="newReview.title = $setData($event)"
        @contentChanged="newReview.content = $setData($event)"
        @deleteClicked="deleteReview()"
        @crossClicked="hideModalAndInitErrors('review')"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import auth from '~/middleware/auth';
import QRCode from 'qrcode';
import { shop, reservation, course, sendData, user, newReservation, newReview } from '~/types/api';
import { errors } from '~/types/errors';
import { Context } from '@nuxt/types';

export default Vue.extend({
  middleware: [auth],
  async asyncData({ app }: Context) {
    return await app.$service.mypage.getData(app);
  },
  data() {
    return {
      /* ページ表示用基本データ */
      userId: 0 as number,
      reservations: [] as reservation[],
      histories: [] as reservation[],
      favoriteShops: [] as shop[],
      today: '' as string,
      qrcode: '',
      /* 表示内容決定用フラグ */
      showHistory: false,
      /* 予約内容変更処理用データ */
      newReservation: {
        name: '',
        date: '',
        time: '',
        number: '',
        courses: [],
        selectedCourseIndex: undefined,
        selectedReservationId: 0,
      } as newReservation,
      /* レビュー作成、編集用データ */
      newReview: {
        rate: 0,
        title: '',
        content: '',
        selectedHistoryId: 0,
        selectedReviewId: 0,
        isNew: true,
      } as newReview,
      /* バリデーションエラー格納用データ */
      errors: {
        datetime: [],
        number: [],
        rate: [],
        title: [],
        content: [],
      } as errors,
    }
  },
  methods: {
    showReservationModal(selectedReservation: reservation): void {
      this.newReservation = this.$service.mypage.setNewReservationData(selectedReservation);
      this.$showModal('reservation');
    },
    async updateReservation(): Promise<void> {
      try{
        this.reservations = await this.$service.mypage.updateReservation(this.newReservation, this.userId);
        this.hideModalAndInitErrors('reservation');
      } catch (error: any) {
        this.errors = this.$handleError(Object.keys(this.errors), error.response);
      }
    },
    async deleteReservation(args: number[]): Promise<void> {
      try {
        this.$service.mypage.deleteReservation(args, this.reservations);
      } catch (error: any) {
        this.$alertErrorMessage(error.response);
      }
    },
    showReviewModal(selectedHistory: reservation): void {
      this.newReview = this.$service.mypage.setNewReviewData(selectedHistory);
      this.$showModal('review');
    },
    async registerReview(): Promise<void> {
      try {
        this.histories = await this.$service.mypage.registerReview(this.newReview, this.userId)
        this.hideModalAndInitErrors('review');
      } catch (error: any) {
        this.errors = this.$handleError(Object.keys(this.errors), error.response);
      }
    },
    async updateReview(): Promise<void> {
      try{
        this.histories = await this.$service.mypage.updateReview(this.newReview, this.userId);
        this.hideModalAndInitErrors('review');
      } catch (error: any) {
        this.errors = this.$handleError(Object.keys(this.errors), error.response);
      }
    },
    async deleteReview(): Promise<void> {
      try {
        this.histories = await this.$service.mypage.deleteReview(this.newReview.selectedReviewId, this.histories, this.userId);
        this.hideModalAndInitErrors('review');
      } catch (error: any) {
        this.$alertErrorMessage(error.response);
      }
    },
    async showQRCode(selectedReservation: reservation): Promise<void> {
      /* 予約Id、ユーザーIdを含むQRコードを生成 */
      try {
        this.qrcode = await QRCode.toDataURL(`${selectedReservation.id},${selectedReservation.user_id}`);
        this.$showModal('qr');
      } catch (error: any) {
        alert('エラーが発生しました。時間をおいてから再度お試しください。');
        return;
      }
    },
    async deleteFavorite(index: number, shopId: number): Promise<void> {
      try {
        await this.$service.mypage.deleteFavorite(index, this.userId, shopId, this.favoriteShops);
      } catch (error: any) {
        this.$alertErrorMessage(error.response);
      }
    },
    hideModalAndInitErrors(modifier: string): void {
      this.errors = this.$initializeErrors(Object.keys(this.errors));
      this.$hideModal(modifier);
    }
  },
});
</script>

<style lang="scss">
.mypage {
  width: 90%;
  margin: 0 auto;
  @include flex($ai: flex-start);
  margin-top: 100px;
  
  
  &__header {
    margin-bottom: 20px;
    font-weight: bold;
    font-size: $fz-mid-large;
  }

  &__favorites {
    width: 50%;
    position: relative;
  }

  &__username {
    font-size: $fz-mid-large;
    font-weight: bold;
    position: absolute;
    top: -40px;
  }

  &__favorites-list {
    @include flex($jc: space-between);
    flex-wrap: wrap;
  }

  &__favorite {
    width: 47%;
    margin-bottom: 15px;
  }

  /* レスポンシブ */
  @include mq()  {
    @include flex(column-reverse);
    width: 100%;
    margin-top: 120px;

    &__header {
        font-size: $fz-large;
      }

    &__favorites {
      max-width: 500px;
      width: 100%;
    }

    &__username {
      right: 0px;
      left: 0;
    }

    &__favorite {
      width: 100%;
      margin-bottom: 15px;
    }

    &__message {
      font-size: $fz-small;
    }
  }
}
</style>