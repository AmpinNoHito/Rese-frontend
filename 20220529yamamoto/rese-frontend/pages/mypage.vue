<template>
  <div class="mypage">
    <ReservationDetails
      :reservations="reservations"
      :existReservations="reservations.length"
      :histories="histories"
      :existHistories="histories.length"
      :showHistory="showHistory"
      :isRepresentative="false"
      @toggleSwitchClicked="showHistory = !showHistory;"
      @deleteButtonClicked="deleteReservation($event)"
      @payButtonClicked="$router.push({path: '/pay', query: {rs: $event}})"
      @qrButtonClicked="showQRCode($event)"
      @reservationButtonClicked="showReservationModal($event)"
      @reviewButtonClicked="showReviewModal($event)"/>
    <div class="mypage__favorites">
      <p class="mypage__username">{{$store.state.user.name}}さん</p>
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
    <div class="modal modal--reservation" @click.self="$hideModal('reservation'); initializeErrors();">
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
        @crossClicked="$hideModal('reservation'); initializeErrors();">
        <template v-slot:header>予約変更</template>
        <template v-slot:button>変更する</template>
      </CardReservation>
    </div>
    <div class="modal modal--review" @click.self="$hideModal('review'); initializeErrors();">
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
        @crossClicked="$hideModal('review'); initializeErrors();"
        @deleteClicked="deleteReview()"/>
    </div>
  </div>
</template>

<script>
  import auth from '~/middleware/auth';
  import QRCode from 'qrcode';
  export default {
    middleware: [auth],
    async asyncData({$axios, $getTodaysDate, store}) {
      /* 予約データ取得 */
      const resReservations = await $axios.$get(`/api/reservations/user/${store.state.user.id}`);
      
      /* 予約データがあれば */
      let reservations;
      let histories;
      if (resReservations.data) {
        /* まだ来店していない予約を配列に */
        reservations = resReservations.data.filter(reservation => reservation.visit_completed === 0);

        /* 来店済みの予約を配列に */
        histories = resReservations.data.filter(reservation => reservation.visit_completed === 1).reverse();
      }

      /* お気に入り店舗取得 */
      const resFavorites = await $axios.$get(`/api/shops/favorites/${store.state.user.id}`);
      const favoriteShops = resFavorites.data;

      /* 今日の日付を取得 */
      const today = $getTodaysDate();

      return {
        /* ページ表示用基本データ */
        reservations: (reservations?.length) ? reservations : [],
        histories: (histories?.length) ? histories: [],
        favoriteShops: (favoriteShops?.length) ? favoriteShops : [],
        today: today,
        qrcode: '',
        /* 表示内容決定用フラグ */
        showHistory: false,
        /* 予約内容変更処理用データ */
        reservation: {
          name: '',
          date: '',
          time: '',
          number: null,
          courses: [],
          selectedCourseIndex: '',
          selectedReservationId: '',
        },
        /* レビュー作成、編集用データ */
        review: {
          rate: null,
          title: '',
          content: '',
          selectedHistoryId: '',
          selectedReviewId: '',
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
      }
    },
    methods: {
      showReservationModal(selectedReservation) {
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
          const selectedCourseIndex = selectedReservation.shop.courses.findIndex(course => course.id === selectedReservation.course_id);
          this.reservation.selectedCourseIndex = selectedCourseIndex.toString();
        } else {
          this.reservation.selectedCourseIndex = '';
        }

        this.$showModal('reservation');
      },
      async updateReservation() {
        /* 入力値から送信用データを作成 */
        const newCourse = this.reservation.selectedCourseIndex;
        const newDatetime = (this.reservation.date && this.reservation.time) ? `${this.reservation.date} ${this.reservation.time}` : '';
        const newNumber = this.reservation.number.slice(0, -1);
        
        const sendData = {
          datetime: newDatetime,
          number: (newNumber) ? +newNumber : '',
        }

        /* コースが選択されていれば送信データに追加 */
        if (newCourse) {
          sendData.course_id = this.reservation.courses[newCourse].id;
        }

        try {
          /* 予約内容変更処理 */
          await this.$axios.put(`/api/reservations/${this.reservation.selectedReservationId}`, sendData);
          alert('予約内容を変更しました。');
          this.updateDisplay('reservation');
          this.initializeErrors();
        } catch (error) {
          this.errorHandling(error.response);
        }
      },
      async deleteReservation(args) {
        const [index, reservationId] = args;
        const ch = confirm('予約を取り消しますか？');
        if (!ch) return;

        /* dataの配列とDBから削除 */
        try {
          await this.$axios.delete(`/api/reservations/${reservationId}`);
          this.reservations.splice(index, 1);
        } catch (error) {
          this.alertErrorMessage(error.response);
        }
      },
      showReviewModal(selectedHistory) {
        /* レビューの有無を確認 */
        if (selectedHistory.review) {
          this.review.isNew = false;
        } else {
          this.review.isNew = true;
        }

        /* インプットに初期値を設定 */
        this.review.rate = (selectedHistory.review) ? selectedHistory.review.rate : 0;
        this.review.title = selectedHistory.review?.title;
        if (selectedHistory.review?.content) {
          this.review.content = selectedHistory.review?.content;
          const textarea = document.querySelector('.card-review__textarea');
          textarea.value = selectedHistory.review?.content;
        } else {
          this.review.content = '';
          const textarea = document.querySelector('.card-review__textarea');
          textarea.value = '';
        }

        /* 選択された予約履歴、レビューのIdを記録 */
        this.review.selectedHistoryId = selectedHistory.id;
        this.review.selectedReviewId = selectedHistory.review?.id;

        this.$showModal('review');
      },
      async registerReview() {
        /* 入力値から送信用データを作成 */
        const sendData = {
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
          await this.$axios.post('/api/reviews', sendData);
          alert('新規レビューを投稿しました。');
          this.updateDisplay('review');
        } catch (error) {
          this.errorHandling(error.response);
        }
      },
      async updateReview() {
        /* 入力値から送信用データを作成 */
        const sendData = {
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
          await this.$axios.put(`/api/reviews/${this.review.selectedReviewId}`, sendData);
          alert('レビュー内容を変更しました。');
          this.updateDisplay('review');
        } catch (error) {
          this.errorHandling(error.response);
        }
      },
      async deleteReview() {
        /* 削除するか確認 */
        const ch = confirm('レビューを削除しますか？');
        if (!ch) return;

        /* DBから削除 */
        try {
          await this.$axios.delete(`/api/reviews/${this.review.selectedReviewId}`);
          this.updateDisplay('review');
        } catch (error) {
          this.alertErrorMessage(error.response);
        }
      },
      async showQRCode(selectedReservation) {
        /* 予約Id、ユーザーIdを含むQRコードを生成 */
        try {
          this.qrcode = await QRCode.toDataURL(`${selectedReservation.id},${selectedReservation.user_id}`);
        } catch (error) {
          alert('エラーが発生しました。時間をおいてから再度お試しください。');
          /* 確認用ログ */
          console.log(error);
          return;
        }

        this.$showModal('qr');
      },
      async deleteFavorite(index, shopId) {
        const ch = confirm('お気に入り店舗から削除しますか？');
        if (!ch) return;
        
        /* dataの配列とDBから削除 */
        try {
          await this.$axios.delete(`/api/favorites/${this.$store.state.user.id}/${shopId}`);
          this.favoriteShops.splice(index, 1);
        } catch (error) {
          this.alertErrorMessage(error.response);
        }
      },
      async updateDisplay(modalModifier) {
        const res = await this.$axios.get(`/api/reservations/user/${this.$store.state.user.id}`);
        this.reservations = res.data.data.filter(reservation => reservation.visit_completed === 0);
        this.histories = res.data.data.filter(reservation => reservation.visit_completed === 1).reverse();
        this.$hideModal(modalModifier);
      },
    },
  };
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