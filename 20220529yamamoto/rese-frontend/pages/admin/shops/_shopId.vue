<template>
  <ShopTemplate>
    <ShopDetail :admin="true" :shop="shop" :deleteCourse="deleteCourse"/>
    <ReservationDetail
      :reservations="reservations"
      :histories="histories"
      :showHistory="showHistory"
      :isRepresentative="true"
      :toggleSwitchClicked="() => showHistory = !showHistory"
      :codeReaderButtonClicked="showCodeReader"
      :reviewButtonClicked="showReviewModal"
    />
    <ShopEditModal
      :header="'店舗情報編集'"
      :newShop="newShop"
      :errors="errors"
      :atNameInput="(value) => newShop.name = value"
      :atDescriptionInput="(value) => newShop.description = value"
      :regionChanged="(value) => newShop.region_id = +value"
      :genreChanged="(value) => newShop.genre_id = +value"
      :previewImage="previewImage"
      :imageChanged="async function() {newShop.base64EncodedImage = previewImage = await $processImage(e)}"
      :buttonText="'更新'"
      :buttonClicked="updateShop"
    />
    <CourseEditModal
      :newCourse="newCourse"
      :atNameInput="value => this.newCourse.name = value"
      :atPriceInput="value => this.newCourse.price = value"
      :atDescriptionInput="value => this.newCourse.description = value"
      :buttonClicked="registerCourse"
      :errors="errors"
      :initializeErrors="() => $initializeErrors(errors)"
    />
    <ReviewModal :selectedReview="selectedReview"/>
    <CodeReaderModal
      :startingUp="codeReaderStartingUp"
      :decode="registerVisit"
      :init="readQRCode"
      :hideCodeReader="hideCodeReader"
    />
  </ShopTemplate>
</template>

<script lang="ts">
import Vue from 'vue';
import CrossAtom from '~/components/atoms/Icon/Cross.vue';
import ShopDetail from '~/components/organisms/Composition/ShopDetail.vue';
import ShopEditModal from '~/components/organisms/Modal/ShopEdit.vue';
import ReservationDetail from '~/components/organisms/Composition/ReservationDetail.vue';
import CourseEditModal from '~/components/organisms/Modal/CourseEdit.vue';
import ReviewModal from '~/components/organisms/Modal/Review.vue';
import CodeReaderModal from '~/components/organisms/Modal/CodeReader.vue';
import ShopTemplate from '~/layouts/templates/Shop.vue';
import { reservation, review, user } from '~/types/api';
import representative from '~/middleware/representative';
import { adminShopData } from '~/types/pageData';

export default Vue.extend({
  middleware: [representative],
  components: {
    CrossAtom,
    ShopDetail,
    ShopEditModal,
    ReservationDetail,
    CourseEditModal,
    ReviewModal,
    CodeReaderModal,
    ShopTemplate,
  },
  async asyncData({ params, app: { $service, $accessor } }) {
    /* 店舗データ取得 */
    const representative = $accessor.user as user;
    return await $service.adminShop.getData(representative.id, +params.shopId);
  },
  data() {
    return {
      shop: {
        id: 0,
        representative_id: 0,
        name: '',
        region: {
          id: 0,
          name: '',
        },
        genre: {
          id: 0,
          name: '',
        },
        description: '',
        image: '',
        courses: [],
      },
      representativeId: 0,
      reservations: [],
      histories: [],
      codeReaderStartingUp: false,
      selectedReservation: {} as reservation,
      showHistory: false,
      previewImage: undefined,
      selectedReview: {
        rate: 0,
        title: '',
        content: '',
      },
      newShop: { // 店舗情報更新用データ 
        name: '',
        description: '',
        base64EncodedImage: undefined,
        region_id: 0,
        genre_id: 0,
      },
      newCourse: { // 新規コース登録用データ
        name: undefined,
        price: undefined,
        description: undefined,
      },
      errors: {
        name: [],
        description: [],
        image: [],
        region_id: [],
        genre_id: [],
        price: [],
      },
    } as adminShopData;
  },
  methods: {
    async updateShop(): Promise<void> {
      const res = await this.$service.adminShop.updateShop(this.shop.id, this.newShop)
        .catch(error => {
          throw this.$handleError(this.errors, error.response);
        });
      
      this.shop = res;
      this.$initializeErrors(this.errors);
      this.$hideModal('shop');
    },
    async registerCourse (): Promise<void> {
      const res = await this.$service.adminShop.registerCourse(this.shop.id, this.newCourse)
        .catch(error => {
          throw this.$handleError(this.errors, error.response);
        });
      
      this.shop.courses = res;
      this.newCourse.name = this.newCourse.price = this.newCourse.description = undefined;
      this.$initializeErrors(this.errors);
      this.$hideModal('course');
    },
    async deleteCourse(courseId: number): Promise<void> {
      const res = await this.$service.adminShop.deleteCourse(this.shop.id, courseId, this.shop.courses)
        .catch(error => {
          throw this.$alertErrorMessage(error.response);
        });

      this.shop.courses = res;
    },
    showReviewModal(review: review) {
      this.selectedReview = {
        rate: review.rate,
        title: review.title,
        content: review.content,
      }
      this.$showModal('review');
    },
    showCodeReader(reservation: reservation): void {
      this.selectedReservation = reservation;
      this.codeReaderStartingUp = true;
      this.$showModal('code-reader');
      this.$stopScroll();
    },
    hideCodeReader(): void {
      this.codeReaderStartingUp = false;
      this.$hideModal('code-reader');
      this.$restartScroll();
    },
    async readQRCode(promise: Promise<void>): Promise<void> {
      await promise.catch(error => {
        alert('エラーが発生しました。デバイスのカメラ設定をご確認のうえ再度お試しください。');
        this.hideCodeReader();
      });
    },
    async registerVisit(decodedResult: string): Promise<void> {
      const res = await this.$service.adminShop.registerVisit(decodedResult, this.selectedReservation, this.representativeId)
        .catch(error => {
          throw this.$alertErrorMessage(error.response);
        });
      
      [this.reservations, this.histories] = res;
      this.hideCodeReader();
    },
  },
});
</script>
