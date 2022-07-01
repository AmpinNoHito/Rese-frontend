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
      @click.self="
        $hideModal('reservation');
        errors = $initializeErrors(Object.keys(errors));
      ">
      <CardReservation
        class="modal__reservation-card"
        v-if="reservation.selectedReservationId"
        :date="reservation.date"
        :today="today"
        :time="reservation.time"
        :number="reservation.number"
        :courses="reservation.courses"
        :selectedCourseIndex="reservation.selectedCourseIndex"
        :shopName="reservation.name"
        :datetimeErrors="errors.datetime"
        :numberErrors="errors.number"
        :showCross="true"
        @dateChanged="reservation.date = $setData($event)"
        @timeChanged="reservation.time = $setData($event)"
        @courseChanged="reservation.selectedCourseIndex = $setData($event)"
        @numberChanged="reservation.number = $setData($event)"
        @buttonClicked="updateReservation"
        @crossClicked="
          $hideModal('reservation');
          errors = $initializeErrors(Object.keys(errors));
        ">
        <template v-slot:header>予約変更</template>
        <template v-slot:button>変更する</template>
      </CardReservation>
    </div>
    <div class="modal modal--review" @click.self="$hideModal('review'); errors = $initializeErrors(Object.keys(errors));">
      <CardReview
        class="modal__review-card"
        :rate="review.rate"
        :title="review.title"
        :content="review.content"
        :rateErrors="errors.rate"
        :titleErrors="errors.title"
        :contentErrors="errors.content"
        :isNewReview="review.isNew"
        @registerButtonClicked="registerReview"
        @updateButtonClicked="updateReview"
        @starClicked="review.rate = $setData($event)"
        @titleChanged="review.title = $setData($event)"
        @contentChanged="review.content = $setData($event)"
        @deleteClicked="deleteReview()"
        @crossClicked="
          $hideModal('review'); 
          errors = $initializeErrors(Object.keys(errors));
        "/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import auth from '~/middleware/auth';
import QRCode from 'qrcode';
import { shop, reservation, course, sendData, user } from '~/types/api';
import { errorsObject } from '~/types/errors';
import { Context } from '@nuxt/types';

export default Vue.extend({
  middleware: [auth],
  async asyncData({ app: { $repositories, $accessor, $getTodaysDate } }: Context) {
    const user = $accessor.user as user;
    /* 予約データ取得 */
    const reservationData: reservation[] = await $repositories.reservation.getByUserId(user.id);
    
    /* 予約データがあれば */
    const reservations: reservation[] = [];
    const histories: reservation[] = [];
    if (reservationData.length) {
      reservationData.forEach(reservation => {
        reservation.visit_completed ?
          /* まだ来店していない場合 */
          histories.push(reservation) :
          /* 来店済みの場合 */
          reservations.push(reservation);
      })

      reservationData.filter(reservation => reservation.visit_completed === 1).reverse();
    }

    /* お気に入り店舗取得 */
    const favoriteShops: shop[] = await $repositories.shop.getFavoriteShops(user.id);

    /* 今日の日付を取得 */
    const today: string = $getTodaysDate();

    return {
      /* ページ表示用基本データ */
      reservations: reservations,
      histories: histories,
      favoriteShops: (favoriteShops?.length) ? favoriteShops : [],
      today: today,
      userId: user.id,
    }
  },
  data() {
    return {
      /* ページ表示用基本データ */
      reservations: [] as reservation[],
      histories: [] as reservation[],
      favoriteShops: [] as (number | null)[],
      today: '' as string,
      qrcode: '',
      /* 表示内容決定用フラグ */
      showHistory: false,
      /* 予約内容変更処理用データ */
      reservation: {
        name: '' as string,
        date: '' as string,
        time: '' as string,
        number: '' as string,
        courses: [] as (course[] | undefined),
        selectedCourseIndex: undefined as (number | undefined),
        selectedReservationId: 0 as number,
      },
      /* レビュー作成、編集用データ */
      review: {
        rate: 0 as number,
        title: '' as string,
        content: '' as string,
        selectedHistoryId: 0 as number,
        selectedReviewId: 0 as number,
        isNew: true,
      },
      /* バリデーションエラー格納用データ */
      errors: {
        datetime: [],
        number: [],
        rate: [],
        title: [],
        content: [],
      } as errorsObject,
      /* ユーザーId */
      userId: 0 as number,
    }
  },
  methods: {
    showReservationModal(selectedReservation: reservation): void {
      /* 予約変更モーダル内のインプットに、選択された予約の情報を初期値として代入 */
      this.reservation.date = selectedReservation.datetime.slice(0, 10);
      this.reservation.time = selectedReservation.datetime.slice(11, -3);
      this.reservation.number = `${selectedReservation.number}人`;
      this.reservation.name = selectedReservation.shop.name;
      this.reservation.courses = selectedReservation.shop.courses;

      /* 変更する予約のidを記録 */
      this.reservation.selectedReservationId = selectedReservation.id;

      /* コースが選ばれている予約が選択された場合は、コースのインデックスを取得 */
      if (selectedReservation.course_id) {
        const selectedCourseIndex = selectedReservation.shop.courses?.findIndex(course => course.id === selectedReservation.course_id) as number;
        this.reservation.selectedCourseIndex = selectedCourseIndex;
      } else {
        this.reservation.selectedCourseIndex = undefined;
      }

      this.$showModal('reservation');
    },
    async updateReservation(): Promise<void> {
      /* 入力値から送信用データを作成 */
      const newDatetime: string = 
        (this.reservation.date && this.reservation.time) ?
        `${this.reservation.date} ${this.reservation.time}` : 
        '';
      const newNumber: number = +this.reservation.number.slice(0, -1);
      
      const sendData: sendData = {
        datetime: newDatetime,
        number: newNumber,
        course_id: null,
      }

      /* コースが選択されていれば送信データに追加 */
      const newCourseIndex: (number | undefined) = this.reservation.selectedCourseIndex;
      if (newCourseIndex !== undefined) {
        const courses = this.reservation.courses as course[];
        sendData.course_id = courses[newCourseIndex].id;
      }

      try {
        /* 予約内容変更処理 */
        await this.$repositories.reservation.update(this.reservation.selectedReservationId, sendData);
        alert('予約内容を変更しました。');
        this.updateDisplay('reservation');
        this.$initializeErrors(Object.keys(this.errors));
      } catch (error: any) {
        this.errors = this.$errorHandling(Object.keys(this.errors), error.response);
      }
    },
    async deleteReservation(args: number[]): Promise<void> {
      const [index, reservationId] = args;
      const ch = confirm('予約を取り消しますか？');
      if (!ch) return;

      /* dataの配列とDBから削除 */
      try {
        await this.$repositories.reservation.delete(reservationId);
        this.reservations.splice(index, 1);
      } catch (error: any) {
        this.$alertErrorMessage(error.response);
      }
    },
    showReviewModal(selectedHistory: reservation): void {
      /* 新規レビューか否かを確認 */
      if (!selectedHistory.review) {
        this.review.isNew = true;
      } else {
        this.review.isNew = false;
      }

      /* インプットに初期値を設定 */
      this.review.rate = (selectedHistory.review) ? selectedHistory.review.rate : 0;
      this.review.title = selectedHistory.review?.title;
      const textarea = document.querySelector('.card-review__textarea') as HTMLTextAreaElement;
      if (selectedHistory.review?.content) {
        this.review.content = selectedHistory.review?.content;
        textarea.value = selectedHistory.review?.content;
      } else {
        this.review.content = '';
        textarea.value = '';
      }

      /* 選択された予約履歴、レビューのIdを記録 */
      this.review.selectedHistoryId = selectedHistory.id;
      this.review.selectedReviewId = selectedHistory.review?.id;

      this.$showModal('review');
    },
    async registerReview(): Promise<void> {
      /* 入力値から送信用データを作成 */
      const sendData: sendData = {
        reservation_id: this.review.selectedHistoryId,
        rate: this.review.rate,
      }

      /* タイトルと内容は値がある場合のみ送信 */
      if (this.review.title) {
        sendData.title = this.review.title;
      }
      if (this.review.content) {
        sendData.content = this.review.content;
      }

      try {
        /* 新規作成実行 */
        await this.$repositories.review.register(sendData);
        alert('新規レビューを投稿しました。');
        this.errors = this.$initializeErrors(Object.keys(this.errors));
        this.updateDisplay('review');
      } catch (error: any) {
        this.errors = this.$errorHandling(Object.keys(this.errors), error.response);
      }
    },
    async updateReview(): Promise<void> {
      /* 入力値から送信用データを作成 */
      const sendData: sendData = {
        rate: this.review.rate,
      }

      /* タイトルと内容は値がある場合のみ送信 */
      if (this.review.title) {
        sendData.title = this.review.title;
      }
      if (this.review.content) {
        sendData.content = this.review.content;
      }

      try {
        /* レビュー内容変更処理 */
        await this.$repositories.review.update(this.review.selectedReviewId, sendData);
        alert('レビュー内容を変更しました。');
        this.updateDisplay('review');
      } catch (error: any) {
        this.errors = this.$errorHandling(Object.keys(this.errors), error.response);
      }
    },
    async deleteReview(): Promise<void> {
      /* 削除するか確認 */
      const ch = confirm('レビューを削除しますか？');
      if (!ch) return;

      /* DBから削除 */
      try {
        await this.$repositories.review.delete(this.review.selectedReviewId);
        alert('レビューを削除しました。');
        this.updateDisplay('review');
      } catch (error: any) {
        this.$alertErrorMessage(error.response);
      }
    },
    async showQRCode(selectedReservation: reservation): Promise<void> {
      /* 予約Id、ユーザーIdを含むQRコードを生成 */
      try {
        this.qrcode = await QRCode.toDataURL(`${selectedReservation.id},${selectedReservation.user_id}`);
      } catch (error: any) {
        alert('エラーが発生しました。時間をおいてから再度お試しください。');
        /* 確認用ログ */
        console.log(error);
        return;
      }

      this.$showModal('qr');
    },
    async deleteFavorite(index: number, shopId: number): Promise<void> {
      const ch = confirm('お気に入り店舗から削除しますか？');
      if (!ch) return;
      
      /* dataの配列とDBから削除 */
      try {
        await this.$repositories.favorite.delete(this.userId, shopId);
        this.favoriteShops.splice(index, 1);
      } catch (error: any) {
        this.$alertErrorMessage(error.response);
      }
    },
    async updateDisplay(modalModifier: string) {
      const reservationData = await this.$repositories.reservation.getByUserId(this.userId);
      this.reservations = reservationData.filter(reservation => reservation.visit_completed === 0);
      this.histories = reservationData.filter(reservation => reservation.visit_completed === 1);
      this.$hideModal(modalModifier);
    },
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