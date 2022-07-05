<template>
  <div class="pay">
    <div class="pay__inner">
      <p class="pay__header">お支払い内容</p>
      <div class="pay__confirmation">
        <p class="pay__confirmation-item">Shop<span>{{reservation.shop.name}}</span></p>
        <p class="pay__confirmation-item">Number<span>{{reservation.number}}</span></p>
        <p class="pay__confirmation-item">Course<span>{{reservation.course.name}}</span></p>
        <p class="pay__confirmation-item">Price<span>¥{{reservation.course.price}}/人</span></p>
        <p class="pay__confirmation-item pay__confirmation-item--amount">Total<span>¥{{amount}}</span></p>
      </div>
      <p class="pay__header">カード情報入力欄</p>
      <stripe-element-card
      ref="elementRef"
      :pk="stripePK"
      :testMode="true"
      @token="pay">
    </stripe-element-card>
    <ButtonBasic class="pay__button" @clicked="submit">支払う</ButtonBasic>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import auth from '~/middleware/auth';
import { Stripe } from 'stripe';
import { payData } from '~/types/pageData';

export default Vue.extend({
  middleware: [auth],
  async asyncData ({ app, query }) {
    return await app.$service.pay.getData(+query.rs);
  },
  data() {
    return {
      reservation: {},
      amount: 0,
      stripePK: this.$config.stripePK,
    } as payData;
  },
  methods: {
    submit (): void {
      /* Stripeにカード情報を送信、トークンを取得 */
      (this as any).$refs?.elementRef?.submit();
    },
    async pay (token: Stripe.Token): Promise<void> {
      try {
        await this.$service.pay.pay(this.reservation.id, token, this.amount);
        this.$router.push('/mypage');
      } catch (error: any) {
        this.$alertErrorMessage(error.response);
      }
    },
  },
});
</script>

<style lang="scss">
.pay {
  @include flex();

  &__inner {
    color: #fff;
    background-color: $c-blue;
    width: 50%;
    min-height: 350px;
    height: fit-content;
    padding: 20px 20px 50px;
    border-radius: 5px;
    @include shadow(2);
    position: relative;
  }

  &__header {
    font-size: $fz-mid-large;
    margin-bottom: 10px;
  }

  &__confirmation {
    margin-bottom: 20px;
    background-color: $c-blue--light;
    padding: 15px 25px;
    border-radius: 5px;
    width: 100%;
  }

  &__confirmation-item {
    margin: 10px 0;
    position: relative;

    & > span {
      position: absolute;
      left: 80px;
    }

    &--amount {
      margin-top: 20px;
      font-size: $fz-mid-large;
      text-align: right;

      & > span {
        position: relative;
        left: 0;
        margin-left: 20px;
      }
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
    &__inner {
      margin-top: 100px;
      width: 100%;
      max-width: 500px;
    }
  }
}
</style>