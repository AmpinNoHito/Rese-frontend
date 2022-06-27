import Vue from 'vue';
import {
  StripePlugin,
  StripeCheckout,
  StripeElementCard,
} from '@vue-stripe/vue-stripe';

export default async () => {
  Vue.component('StripeCheckout', StripeCheckout);
  Vue.component('StripeElementCard', StripeElementCard);
  const interval = setInterval(() => {
    if (window.Stripe) {
      Vue.use(StripePlugin, { pk: process.env.STRIPE_PK });
      clearInterval(interval);
    }
  }, 50);
};