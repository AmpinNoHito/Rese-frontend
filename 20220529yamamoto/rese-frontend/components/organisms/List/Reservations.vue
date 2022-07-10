<template>
  <div class="reservation-list">
    <HeaderUnit :headerText="'予約状況'" :spanText="'過去の予約履歴'" :spanClicked="toggleSwitchClicked"/>
    <ParagraphAtom v-if="!reservations.length" class="reservation-list__message" :text="'予約はありません。'"/>
    <div class="reservation-list__item" v-for="(reservation, index) in reservations" :key="reservation.id">
      <CrossAtom
        v-if="!isRepresentative"
        class="reservation-list__cross"
        :clicked="() => deleteButtonClicked(index, reservation.id)"/>
      <ImageAtom
        class="reservation-list__clock"
        :src="require('~/assets/images/icon-clock.png')"
        :alt="'時計'"/>
      <ParagraphAtom class="reservation-list__item-number" :text="`予約${index + 1}`"/>
      <NestedText v-if="isRepresentative" class="reservation-list__item-detail" :parentText="'Customer'" :childText="reservation.user.name"/>
      <NestedText v-if="!isRepresentative" class="reservation-list__item-detail" :parentText="'Shop'" :childText="reservation.shop.name"/>
      <NestedText class="reservation-list__item-detail" :parentText="'Date'" :childText="reservation.date"/>
      <NestedText class="reservation-list__item-detail" :parentText="'Time'" :childText="reservation.time"/>
      <NestedText class="reservation-list__item-detail" :parentText="'Number'" :childText="reservation.number"/>
      <NestedText v-if="reservation.course" class="reservation-list__item-detail" :parentText="'Course'" :childText="reservation.course.name"/>
      <NestedText v-if="reservation.course" class="reservation-list__item-detail" :parentText="'Total'" :childText="`¥${reservation.amount}`">
        <SpanAtom v-if="reservation.advance_payment" class="reservation-list__paid" :text="'(支払済み)'"/>
      </NestedText>  
      <ButtonAtom
        v-if="!isRepresentative && reservation.course && !reservation.advance_payment"
        class="reservation-list__button reservation-list__button--pay"
        :text="'事前支払い'"
        :clicked="() => payButtonClicked(reservation.id)"
      />
      <ButtonAtom
        v-if="!isRepresentative"
        class="reservation-list__button reservation-list__button--change"
        :text="'予約内容変更'"
        :clicked="() => reservationButtonClicked(reservation)"
      />
      <ButtonAtom
        v-if="!isRepresentative"
        class="reservation-list__button reservation-list__button--qr"
        :text="'QRコード表示'"
        :clicked="() => qrButtonClicked(reservation)"
      />
      <ButtonAtom
        v-if="isRepresentative"
        class="reservation-list__button reservation-list__button--code-reader"
        :text="'コードリーダー起動'"
        :clicked="() => codeReaderButtonClicked(reservation)"
      />
    </div>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import ParagraphAtom from '~/components/atoms/Text/Paragraph.vue';
import SpanAtom from '~/components/atoms/Text/Span.vue';
import CrossAtom from '~/components/atoms/Icon/Cross.vue';
import ImageAtom from '~/components/atoms/Image/Image.vue';
import ButtonAtom from '~/components/atoms/Button/Button.vue';
import NestedText from '~/components/molecules/TextUnit/NestedText.vue';
import HeaderUnit from '~/components/molecules/TextUnit/HeaderUnit.vue';

export default Vue.extend({
  components: {
    ParagraphAtom,
    SpanAtom,
    CrossAtom,
    ImageAtom,
    ButtonAtom,
    NestedText,
    HeaderUnit,
  },
  props: {
    reservations: Array,
    isRepresentative: {
      type: Boolean,
      required: false,
      default: false,
    },
    toggleSwitchClicked: Function,
    deleteButtonClicked: Function,
    payButtonClicked: Function,
    qrButtonClicked: Function,
    codeReaderButtonClicked: Function,
    reservationButtonClicked: Function,
  },
});
</script>


<style lang="scss">
.reservation-list {
  &__item {
    background-color: $c-blue;
    color: #fff;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 15px;
    @include shadow(1);
    position: relative;

    &:first-of-type {
      margin-top: 10px;
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

  &__paid {
    padding-top: 1em;
    position: absolute;
    left: 80px;
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
    &--code-reader {
      bottom: 15px;
    }
  }
  
  &__message {
    margin-top: 20px;
  }

  @include mq()  {
    &__item-detail {
      margin: 20px 0;
      position: relative;
      
      &--pay {
        margin-bottom: 10px;
      }
    }

    &__br {
      display: none;
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