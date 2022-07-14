<template>
  <ShopTemplate>
    <ShopDetail :shop="shop"/>
    <ReservationCard
      :shopName="shop.name"
      :headerText="'予約'"
      :buttonText="'予約する'"
      :newReservation="newReservation"
      :atDateInput="value => newReservation.date = value"
      :timeChanged="value => newReservation.time = value"
      :numberChanged="value => newReservation.number = value"
      :courseChanged="value => newReservation.selectedCourseIndex = +value"
      :buttonClicked="registerReservation"
      :errors="errors"
    />
  </ShopTemplate>
</template>

<script lang="ts">
import Vue from 'vue';
import ShopDetail from '~/components/organisms/Composition/ShopDetail.vue';
import ReservationCard from '~/components/organisms/Card/Reservation.vue';
import ShopTemplate from '~/layouts/templates/Shop.vue';
import { Course } from '~/types/api';
import { ShopData, ShopQuery } from '~/types/pageData';

export default Vue.extend({
  components: {
    ShopDetail,
    ReservationCard,
    ShopTemplate,
  },
  async asyncData({app, params, query}) {
    const stringifiedQuery: ShopQuery = {
      dt: app.$queryToString(query.dt),
      tm: app.$queryToString(query.tm),
      nm: app.$queryToString(query.nm),
      sc: app.$queryToString(query.sc),
    }
    const today = app.$getTodaysDate();
    return await app.$service.shop.getData(+params.shopId, today, stringifiedQuery);
  },
  data() {
    const courses: Course[] = [];
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
        courses: courses,
      },
      newReservation: {
        courses: [],
        date: '',
        time: '',
        number: '',
        selectedReservationId: 0,
        selectedCourseIndex: 0,
      },
      errors: {
        datetime: [],
        number: [],
      },
    } as ShopData;
  },
  methods: {
    /* 予約情報を登録 */
    async registerReservation() {
      const res = await this.$service.shop.registerReservation(this.newReservation, this.$accessor.user.id, this.shop.id)
        .catch(error => {
          throw this.$handleError(this.errors, error.response);
        });
      
      this.$router.push(res);
    },
  },
});
</script>
