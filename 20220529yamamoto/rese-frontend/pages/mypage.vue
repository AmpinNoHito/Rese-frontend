<template>
  <MypageTemplate>
    <ReservationDetail
      :reservations="reservations"
      :histories="histories"
      :showHistory="showHistory"
      :toggleSwitchClicked="() => showHistory = !showHistory"
      :deleteButtonClicked="deleteReservation"
      :payButtonClicked="(rs) => $router.push({path: '/pay', query: {rs: rs}})"
      :qrButtonClicked="showQRCode"
      :reservationButtonClicked="showReservationModal"
      :reviewButtonClicked="showReviewModal"/>
    <FavoriteShopList
      :userName="$accessor.user.name"
      :favoriteShops="favoriteShops"
      :heartClicked="deleteFavorite"
      :linkClicked="shopId => $router.push(`/shops/${shopId}`)"
    />
    <QRCodeModal :qrcode="qrcode"/>
    <ReservationModal
      class="mypage__reservation-card"
      :shopName="newReservation.name"
      :headerText="'予約変更'"
      :buttonText="'変更する'"
      :newReservation="newReservation"
      :showCross="true"
      :atDateInput="value => newReservation.date = value"
      :timeChanged="value => newReservation.time = value"
      :numberChanged="value => newReservation.number = value"
      :courseChanged="value => newReservation.selectedCourseIndex = +value"
      :buttonClicked="updateReservation"
      :errors="errors"
      :initializeErrors="() => $initializeErrors(errors)"
    />
    <ReviewEditModal
      :newReview="newReview"
      :starClicked="value => newReview.rate = value"
      :titleChanged="value => newReview.title = value"
      :contentChanged="value => newReview.content = value"
      :registerReview="registerReview"
      :updateReview="updateReview"
      :deleteClicked="deleteReview"
      :errors="errors"
      :initializeErrors="() => $initializeErrors(errors)"
    />
  </MypageTemplate>
</template>

<script lang="ts">
import Vue from 'vue';
import auth from '~/middleware/auth';
import ReservationDetail from '~/components/organisms/Composition/ReservationDetail.vue';
import FavoriteShopList from '~/components/organisms/List/FavoriteShops.vue';
import ReservationModal from '~/components/organisms/Modal/Reservation.vue';
import ReviewEditModal from '~/components/organisms/Modal/ReviewEdit.vue';
import QRCodeModal from '~/components/organisms/Modal/QRCode.vue';
import MypageTemplate from '~/layouts/templates/Mypage.vue';
import QRCode from 'qrcode';
import { reservation } from '~/types/api';
import { Context } from '@nuxt/types';
import { mypageData } from '~/types/pageData';

export default Vue.extend({
  middleware: [auth],
  components: {
    ReservationDetail,
    FavoriteShopList,
    ReservationModal,
    ReviewEditModal,
    QRCodeModal,
    MypageTemplate,
  },
  async asyncData({ app }: Context) {
    return await app.$service.mypage.getData(app);
  },
  data() {
    return {
      /* ページ表示用基本データ */
      userId: 0,
      reservations: [],
      histories: [],
      favoriteShops: [],
      today: '',
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
      },
      /* レビュー作成、編集用データ */
      newReview: {
        rate: 0,
        title: '',
        content: '',
        selectedHistoryId: 0,
        selectedReviewId: 0,
        isNew: true,
      },
      /* バリデーションエラー格納用データ */
      errors: {
        datetime: [],
        number: [],
        rate: [],
        title: [],
        content: [],
      },
    } as mypageData;
  },
  methods: {
    showReservationModal(selectedReservation: reservation): void {
      this.newReservation = this.$service.mypage.setNewReservationData(selectedReservation);
      this.$showModal('reservation');
    },
    async updateReservation(): Promise<void> {
      const res = await this.$service.mypage.updateReservation(this.newReservation, this.userId)
        .catch(error => {
          throw this.$handleError(this.errors, error.response);
        });
      
      this.reservations = res;
      this.$initializeErrors(this.errors);
      this.$hideModal('reservation');
    },
    async deleteReservation(reservationIndex: number, reservationId: number): Promise<void> {
      await this.$service.mypage.deleteReservation(reservationIndex, reservationId, this.reservations)
        .catch(error => {
          throw this.$alertErrorMessage(error.response);
        });
    },
    showReviewModal(selectedHistory: reservation): void {
      this.newReview = this.$service.mypage.setNewReviewData(selectedHistory);
      this.$showModal('review');
    },
    async registerReview(): Promise<void> {
      const res = await this.$service.mypage.registerReview(this.newReview, this.userId)
        .catch(error => {
          throw this.$handleError(this.errors, error.response);
        });
      
      this.histories = res;
      this.$initializeErrors(this.errors);
      this.$hideModal('review');
    },
    async updateReview(): Promise<void> {
      const res = await this.$service.mypage.updateReview(this.newReview, this.userId)
        .catch(error => {
          throw this.$handleError(this.errors, error.response);
        });
      
      this.histories = res;
      this.$initializeErrors(this.errors);
      this.$hideModal('review');
    },
    async deleteReview(): Promise<void> {
      const res = await this.$service.mypage.deleteReview(this.newReview.selectedReviewId as number, this.histories, this.userId)
        .catch(error => {
          throw this.$alertErrorMessage(error.response);
        });
      
      this.histories = res;
      this.$initializeErrors(this.errors);
      this.$hideModal('review');
    },
    async showQRCode(selectedReservation: reservation): Promise<void> {
      const res = await QRCode.toDataURL(`${selectedReservation.id},${selectedReservation.user.id}`)
        .catch(error => {
          throw alert('エラーが発生しました。時間をおいてから再度お試しください。');
        });
      
      this.qrcode = res;
      this.$showModal('qr');
    },
    async deleteFavorite(index: number, shopId: number): Promise<void> {
      await this.$service.mypage.deleteFavorite(index, this.userId, shopId, this.favoriteShops)
        .catch(error => {
          throw this.$alertErrorMessage(error.response);
        });
    },
  },
});
</script>

<style lang="scss">
.mypage-reservation-card {
  @include mq() {
    width: 100%;
    max-width: 500px;
  }
}
</style>