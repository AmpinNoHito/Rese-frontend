<template>
  <div class="reservation-details">
    <div  v-if="!showHistory" class="reservation-detail__inner">
      <p class="reservation-details__header">予約状況
        <span class="reservation-details__toggle-switch" @click="toggleSwitchClicked">
          過去の予約履歴
        </span>
      </p>
      <p v-if="!reservationsNum" class="reservation-details__message">予約はありません。</p>
      <div class="reservation-details__item" v-for="(reservation, index) in reservations" :key="reservation.id">
        <img
          v-if="!isRepresentative"
          class="reservation-details__cross"
          src="~/assets/images/icon-cross.png"
          alt="×"
          @click="deleteButtonClicked(index, reservation.id)"/>
        <img
          class="reservation-details__clock"
          src="~/assets/images/icon-clock.png"
          alt="時計"/>
        <p class="reservation-details__item-number">予約{{index + 1}}</p>
        <p v-if="isRepresentative" class="reservation-details__item-detail">Customer<span>{{reservation.user.name}}</span></p>
        <p v-if="!isRepresentative" class="reservation-details__item-detail">Shop<span>{{reservation.shop.name}}</span></p>
        <p class="reservation-details__item-detail">Date<span>{{reservation.datetime | pickOutDate}}</span></p>
        <p class="reservation-details__item-detail">Time<span>{{reservation.datetime | pickOutTime}}</span></p>
        <p class="reservation-details__item-detail">Number<span>{{reservation.number}}人</span></p>
        <p class="reservation-details__item-detail" v-if="reservation.course">Course<span>{{reservation.course.name}}</span></p>
        <p class="reservation-details__item-detail" v-if="reservation.course">Total
          <span>¥{{reservation.course.price * reservation.number}}
            <span v-if="reservation.advance_payment">
              <br class="reservation-details__br">
              (支払済み)
            </span>
          </span>
        </p>
        <ButtonBasic
          v-if="!isRepresentative && reservation.course && !reservation.advance_payment"
          class="reservation-details__button reservation-details__button--pay"
          @clicked="payButtonClicked(reservation.id)">
          事前支払い
        </ButtonBasic>
        <ButtonBasic
          v-if="!isRepresentative"
          class="reservation-details__button reservation-details__button--change"
          @clicked="reservationButtonClicked(reservation)">
          予約内容変更
        </ButtonBasic>
        <ButtonBasic
          v-if="!isRepresentative"
          class="reservation-details__button reservation-details__button--qr"
          @clicked="qrButtonClicked(reservation)">
          QRコード表示
        </ButtonBasic>
        <ButtonBasic
          v-if="isRepresentative"
          class="reservation-details__button reservation-details__button--code-reader"
          @clicked="codeReaderButtonClicked(reservation)">
          コードリーダー起動
        </ButtonBasic>
      </div>
    </div>
    <div v-if="showHistory" class="reservation-details__inner">
      <p class="reservation-details__header">
        予約履歴
        <span class="reservation-details__toggle-switch" @click="toggleSwitchClicked">
          現在の予約状況
        </span>
      </p>
      <p v-if="!historiesNum" class="reservation-details__message">予約履歴はありません。</p>
      <div class="reservation-details__item" v-for="(history, index) in histories" :key="history.id">
        <img
          class="reservation-details__clock"
          src="~/assets/images/icon-clock.png"
          alt="時計"/>
        <p class="reservation-details__item-number">予約履歴{{index + 1}}</p>
        <p v-if="isRepresentative" class="reservation-details__item-detail">Customer<span>{{history.user.name}}</span></p>
        <p v-if="!isRepresentative" class="reservation-details__item-detail">Shop<span>{{history.shop.name}}</span></p>
        <p class="reservation-details__item-detail">Date<span>{{history.datetime | pickOutDate}}</span></p>
        <p class="reservation-details__item-detail">Time<span>{{history.datetime | pickOutTime}}</span></p>
        <p class="reservation-details__item-detail">Number<span>{{history.number}}人</span></p>
        <ButtonBasic
          v-if="!history.review && !isRepresentative"
          class="reservation-details__button reservation-details__button--review"
          @clicked="reviewButtonClicked(history)">
          レビュー新規投稿
        </ButtonBasic>
        <ButtonBasic
          v-if="history.review && !isRepresentative"
          class="reservation-details__button reservation-details__button--review"
          @clicked="reviewButtonClicked(history)">
          レビュー編集
        </ButtonBasic>
        <ButtonBasic
          v-if="history.review && isRepresentative"
          class="reservation-details__button reservation-details__button--review"
          @clicked="reviewButtonClicked(history)">
          レビュー表示
        </ButtonBasic>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { reservation } from "~/types/api";

export default Vue.extend({
  props: {
    reservations: Array,
    reservationsNum: Number,
    histories: Array,
    historiesNum: Number,
    showHistory: Boolean,
    isRepresentative: Boolean,
  },
  filters: {
    pickOutDate(value: string): string {
      return value.slice(0, 10);
    },
    pickOutTime(value: string): string {
      return value.slice(11, -3);
    },
  },
  methods: {
    toggleSwitchClicked(): void {
      this.$emit('toggleSwitchClicked');
    },
    deleteButtonClicked(index: number, reservationId: number): void {
      this.$emit('deleteButtonClicked', [index, reservationId]);
    },
    payButtonClicked(reservationId: number): void {
      this.$emit('payButtonClicked', reservationId);
    },
    qrButtonClicked(reservation: reservation): void {
      this.$emit('qrButtonClicked', reservation);
    },
    codeReaderButtonClicked(reservation: reservation): void {
      this.$emit('codeReaderButtonClicked', reservation);
    },
    reservationButtonClicked(reservation: reservation): void {
      this.$emit('reservationButtonClicked', reservation);
    },
    reviewButtonClicked(history: reservation): void {
      this.$emit('reviewButtonClicked', history);
    },
  },
});
</script>

<style lang="scss">
.reservation-details {
  width: 40%;
  margin-right: 10%;
  position: relative;

  &__header {
    font-weight: bold;
    font-size: $fz-mid-large;
    position: relative;
    margin-bottom: 20px;
  }

  &__toggle-switch {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    font-weight: normal;
    font-size: $fz-smaller;
    color: $c-blue--light;
  }

  &__item {
    background-color: $c-blue;
    color: #fff;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 15px;
    @include shadow(1);
    position: relative;

    &:first-of-type {
      margin-top: 30px;
    }
  }

  &__cross {
    cursor: pointer;
    width: 15px;
    height: 15px;
    position: absolute;
    top: 15px;
    right: 15px;
  }

  &__clock {
    width: 1.2em;
    height: 1.2em;
    vertical-align: -0.2em;
    margin-right: 5px;
  }

  &__item-number {
    display: inline-block;
    margin-bottom: 10px;
  }

  &__item-detail {
    margin: 10px 0;
    position: relative;

    & > span {
      position: absolute;
      left: 80px;
    }
  }

  &__button {
    background-color: $c-blue--dark !important;
    color: #fff;
    font-size: $fz-smaller;
    font-weight: bold;
    position: absolute;
    right: 15px;

    &--pay {
      bottom: 85px;
    }

    &--change {
      bottom: 50px;
    }

    &--qr,
    &--review,
    &--code-reader {
      bottom: 15px;
    }
  }
}

/* レスポンシブ対応 */
@include mq()  {
  .reservation-details {
    max-width: 500px;
    width: 100%;
    margin: 15px auto 0;
    padding-top: 15px;
    border-top: 0.2px solid $c-tp;

    &__header {
      margin-top: 40px;
      font-size: $fz-large;
    }

    &__item-detail {
      margin: 20px 0;
      position: relative;
      
      &--pay {
        margin-bottom: 10px;
      }

      & > span {
        position: absolute;
        left: 80px;
      }
    }

    &__br {
      display: none;
    }

    &__toggle-switch {
      font-size: 20px;
    }

    &__cross {
      width: 30px;
      height: 30px;
    }

    &__button  {
      padding: 20px;
      position: relative;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      width: 100%;
      margin: 5px 0;
    }

    &__message {
      font-size: $fz-small;
    }
  }
}
</style>