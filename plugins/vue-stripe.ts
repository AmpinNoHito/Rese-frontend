import Vue from 'vue';
import Stripe from 'stripe';
import {
  StripePlugin,
  StripeCheckout,
  StripeElementCard,
} from '@vue-stripe/vue-stripe';

declare global {
  interface Window { Stripe: Stripe }
}

export default () => {
  Vue.component('StripeCheckout', StripeCheckout);
  Vue.component('StripeElementCard', StripeElementCard);
  const interval = setInterval(() => {
    if (window.Stripe) {
      Vue.use(StripePlugin, { pk: process.env.STRIPE_PK });
      clearInterval(interval);
    }
  }, 50);
};