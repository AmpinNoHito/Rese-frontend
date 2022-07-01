<template>
  <div class="pay">
    <div class="pay__inner">
      <p class="pay__header">お支払い内容</p>
      <div class="pay__confirmation">
        <p class="pay__confirmation-item">Shop<span>{{reservation.shop.name}}</span></p>
        <p class="pay__confirmation-item">Number<span>{{reservation.number}}人</span></p>
        <p class="pay__confirmation-item">Course<span>{{reservation.course.name}}</span></p>
        <p class="pay__confirmation-item">Price<span>¥{{reservation.course.price}}/人</span></p>
        <p class="pay__confirmation-item pay__confirmation-item--total">Total<span>¥{{total}}</span></p>
      </div>
      <p class="pay__header">カード情報入力欄</p>
      <stripe-element-card
      ref="elementRef"
      :pk="pk"
      :testMode="true"
      @token="tokenCreated">
    </stripe-element-card>
    <ButtonBasic class="pay__button" @clicked="submit">支払う</ButtonBasic>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import auth from '~/middleware/auth';
import { reservation, sendData } from '~/types/api';
import { Stripe } from 'stripe';

export default Vue.extend({
  middleware: [auth],
  async asyncData ({app, query}) {
    const reservation: reservation = await app.$repositories.reservation.getById(+query.rs);
    return {
      reservation: reservation,
      total: reservation.number * reservation.course.price,
    }
  },
  data() {
    return {
      reservation: {} as reservation,
      total: 0 as number,
      pk: this.$config.stripePK as string,
    }
  },
  methods: {
    submit (): void {
      /* Stripeにカード情報を送信、トークンを取得 */
      (this as any).$refs?.elementRef?.submit();
    },
    async tokenCreated (token: Stripe.Token): Promise<void> {
      /* 取得したトークン等から送信用データを作成 */
      const sendData: sendData = {
        amount: this.total,
        source: token.id,
      }

      try {
        const successMessage: string = await this.$repositories.reservation.pay(this.reservation.id, sendData);
        alert(`${successMessage}\n\nマイページに遷移します。`);
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

    &--total {
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