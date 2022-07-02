<template>
  <div class="individual-shop">
    <div class="individual-shop__detail">
      <div class="individual-shop__name-wrapper">
        <span class="individual-shop__back" @click="$router.back()">&lt;</span>
        <span class="individual-shop__name">{{shop.name}}</span>
      </div>
      <div class="individual-shop__img">
        <img :src="`${$config.storageUrl}/${shop.image}`" alt="店舗画像">
      </div>
      <span class="individual-shop__region">#{{shop.region.name}}</span>
      <span class="individual-shop__genre">#{{shop.genre.name}}</span>
      <p class="individual-shop__description">{{shop.description}}</p>
      <p class="individual-shop__course-header" v-if="newReservation.courses.length">コース一覧</p>
      <div class="individual-shop__course" v-for="course in newReservation.courses" :key="course.id">
        <p class="individual-shop__course-name">{{course.name}} <span class="individual-shop__course-price">¥{{course.price}}</span></p>
        <p class="individual-shop__course-description">{{course.description}}</p>
      </div>
    </div>
    <CardReservation
      class="individual-shop__reservation"
      :date="newReservation.date"
      :today="$getTodaysDate()"
      :time="newReservation.time"
      :number="newReservation.number"
      :shopName="shop.name"
      :courses="newReservation.courses"
      :selectedCourseIndex="newReservation.selectedCourseIndex"
      :datetimeErrors="errors.datetime"
      :numberErrors="errors.number"
      @dateChanged="newReservation.date = $setData($event)"
      @timeChanged="newReservation.time = $setData($event)"
      @courseChanged="newReservation.selectedCourseIndex = $setData($event)"
      @numberChanged="newReservation.number = $setData($event)"
      @buttonClicked="registerReservation">
      <template v-slot:header>予約</template>
      <template v-slot:button>予約する</template>
    </CardReservation>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { shop, course, sendData, user, newReservation } from '~/types/api';
import { errors } from '~/types/errors';

export default Vue.extend({
  async asyncData({app, params, query}) {
    return await app.$service.shop.getData(+params.shopId, app, [query.dt, query.tm, query.nm, query.sc]);
  },
  data() {
    return {
      shop: {} as shop,
      newReservation: {
        courses: [] as (course | undefined)[],
        date: '',
        time: '',
        number: '',
        selectedCourseIndex: 0,
      } as newReservation,
      errors: {
        datetime: [],
        number: [],
      } as errors,
    }
  },
  methods: {
    /* 予約情報を登録 */
    async registerReservation() {
      try {
        const user = this.$accessor.user as user;
        const location = await this.$service.shop.registerReservation(this.newReservation, user.id, this.shop.id);
        this.$router.push(location);
      } catch (error: any) {
        this.errors = this.$handleError(Object.keys(this.errors), error.response);
      }
    },
  },
});
</script>
