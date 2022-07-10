<template>
  <div class="pay-card">
    <ParagraphAtom class='pay-card__header' :text="'お支払い内容'"/>
    <div class="pay-card__payment-info">
      <NestedText :parentText="'Shop'" :childText="reservation.shop.name"/>
      <NestedText :parentText="'Number'" :childText="reservation.number"/>
      <NestedText :parentText="'Course'" :childText="reservation.course.name"/>
      <NestedText :parentText="'Price'" :childText="`${reservation.course.price}/人`"/>
      <NestedText class="pay-card__amount" :parentText="'Total'" :childText="`¥${reservation.amount}`"/>
    </div>
    <ParagraphAtom class="pay-card__header" :text="'カード情報入力欄'"/>
    <stripe-element-card
      ref="elementRef"
      :pk="$config.stripePK"
      :testMode="true"
      @token="atStripeTokenSet"
    />
    <ButtonAtom
      class="pay-card__button"
      :clicked="submit"
      :text="'支払う'"
    />
  </div>

</template>

<script lang="ts">
import Vue from 'vue'
import ParagraphAtom from '~/components/atoms/Text/Paragraph.vue';
import ButtonAtom from '~/components/atoms/Button/Button.vue';
import NestedText from '~/components/molecules/TextUnit/NestedText.vue';

export default Vue.extend({
  components: {
    ParagraphAtom,
    ButtonAtom,
    NestedText,
  },
  props: {
    reservation: Object,
    atStripeTokenSet: Function,
  },
  methods: {
    submit (): void {
      /* Stripeにカード情報を送信、トークンを取得 */
      (this as any).$refs?.elementRef?.submit();
    },
  },
});
</script>


<style lang="scss">
.pay-card {
  color: #fff;
  background-color: $c-blue;
  width: 50%;
  min-height: 350px;
  height: fit-content;
  padding: 20px 20px 50px;
  margin: 0 auto;
  border-radius: 5px;
  @include shadow(2);
  position: relative;

  &__header {
    font-size: $fz-mid-large;
    margin-bottom: 10px;
  }

  &__payment-info {
    margin-bottom: 20px;
    background-color: $c-blue--light;
    padding: 15px 25px;
    border-radius: 5px;
    width: 100%;
  }

  &__amount {
    margin-top: 20px;
    font-size: $fz-mid-large;
    text-align: right;

    & > .nested-p__child {
      position: relative;
      left: 0;
      margin-left: 20px;
    }
  }

  &__button {
      background-color: $c-blue--dark !important;
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      display: inline-block;
      padding-top: 10px;
      padding-bottom: 10px;
  }

  @include mq() {
    margin-top: 100px;
    width: 100%;
    max-width: 500px;
  }
}
</style>