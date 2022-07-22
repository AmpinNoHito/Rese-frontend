<template>
  <PayCard
    :reservation="reservation"
    :atStripeTokenSet="pay"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import auth from '~/middleware/auth';
import PayCard from '~/components/organisms/Card/Pay.vue';
import { Stripe } from 'stripe';
import { PayData } from '~/types/pageData';

export default Vue.extend({
  middleware: [auth],
  components: {
    PayCard,
  },
  async asyncData ({ app, query, redirect }) {
    if (!query.rs) {
      return redirect(403, "/");
    }
    
    const initData = await app.$service.pay.getData(+query.rs)
      .catch(error => {
        throw app.$alertErrorMessage(error.response)
      });

    /* ユーザーIDが一致しない場合はトップページにリダイレクト */
    const userId = app.$accessor.user.id;
    if (initData?.reservation.user.id !== userId) {
      return redirect(403, "/");
    }

    return initData;
  },
  data() {
    return {
      reservation: {},
    } as PayData;
  },
  methods: {
    async pay (token: Stripe.Token): Promise<void> {
      await this.$service.pay.pay(this.reservation.id, token.id, this.reservation.amount as number)
        .catch(error => {
          throw this.$alertErrorMessage(error.response);
        });
        
      this.$router.push('/mypage');
    },
  },
});
</script>
