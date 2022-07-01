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
      <p class="individual-shop__course-header" v-if="courses.length">コース一覧</p>
      <div class="individual-shop__course" v-for="course in courses" :key="course.id">
        <p class="individual-shop__course-name">{{course.name}} <span class="individual-shop__course-price">¥{{course.price}}</span></p>
        <p class="individual-shop__course-description">{{course.description}}</p>
      </div>
    </div>
    <CardReservation
      class="individual-shop__reservation"
      :date="date"
      :today="today"
      :time="time"
      :number="number"
      :shopName="shop.name"
      :courses="courses"
      :selectedCourseIndex="selectedCourseIndex"
      :datetimeErrors="errors.datetime"
      :numberErrors="errors.number"
      @dateChanged="date = $setData($event)"
      @timeChanged="time = $setData($event)"
      @courseChanged="selectedCourseIndex = $setData($event)"
      @numberChanged="number = $setData($event)"
      @buttonClicked="registerReservation">
      <template v-slot:header>予約</template>
      <template v-slot:button>予約する</template>
    </CardReservation>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { shop, course, sendData, user } from '~/types/api';
import { errorsObject } from '~/types/errors';

export default Vue.extend({
  async asyncData({app, params, query}) {
    /* 店舗データ取得 */
    const shop: shop = await app.$repositories.shop.getById(+params.shopId);
    const today: string = app.$getTodaysDate();

    return {
      shop: shop,
      courses: shop.courses ? shop.courses: [],
      today: today,
      /* クエリパラメータのdtがあればその値をセット、なければ今日の日付 */
      date: (query.dt) ?? today,
      /* クエリパラメータのtm、nmがunselected以外であればその値をセット(遷移前のinputの値を復元) */
    };
  },
  data() {
    return {
      shop: {} as shop,
      courses: [] as (course|undefined)[],
      today: '' as string,
      date: '' as string,
      time: 
        (this.$route.query.tm && this.$route.query.tm !== 'unselected') ?
        this.$route.query.tm as string :
        '' as string,
      number: 
        (this.$route.query.nm && this.$route.query.nm !== 'unselected') ?
        this.$route.query.nm as string:
        '' as string,
      selectedCourseIndex: 
        (this.$route.query.sc && this.$route.query.sc !== 'unselected') ?
        +this.$route.query.sc as (number | undefined) : 
        undefined as (number | undefined),
      errors: {
        datetime: [],
        number: [],
      } as errorsObject,
    }
  },
  methods: {
    /* 予約情報を登録 */
    async registerReservation() {
      /** ログインしていない場合はログイン画面に遷移
       *  ログインして戻ってきたあとに入力値を復元できるよう、クエリパラメータを活用
       **/
      if (!this.$accessor.loggedIn) {
        let query = {
          sh: this.shop.id.toString(),
          dt: this.date,
          tm: this.time ?? 'unselected',
          nm: this.number ?? 'unselected',
          sc: this.selectedCourseIndex?.toString() ?? 'unselected',
        }

        this.$router.push({path: '/login', query: query});
        return;
      }
      /* 入力値から送信用データを作成 */
      const user = this.$accessor.user as user;
      const sendData: sendData = {
        user_id: user.id,
        shop_id: this.shop.id,
        datetime: (this.date && this.time) ? `${this.date} ${this.time}` : '',
        number: this.number?.slice(0, -1) as string,
      }

      /* コースが選択されている場合はコースのIdも追加 */
      if (this.selectedCourseIndex !== undefined) {
          sendData.course_id = this.courses[this.selectedCourseIndex]?.id;
      }

      try {
        /* 予約実行 */
        const newReservation = await this.$repositories.reservation.register(sendData);

        let query = {
          rs: (sendData.course_id !== undefined) ? newReservation.id.toString() : '',
          ch: '0',
        };

        /* dt、tm、nmに値がある場合はクエリパラメータのchを'1'に設定し、/doneからの遷移先を制御 */
        if (this.$route.query.dt && this.$route.query.tm && this.$route.query.nm) {
          query.ch = '1';
        }
        this.$router.push({path: '/done', query: query});
      } catch (error: any) {
        this.errors = this.$errorHandling(Object.keys(this.errors), error.response);
      }
    },
  },
});
</script>
