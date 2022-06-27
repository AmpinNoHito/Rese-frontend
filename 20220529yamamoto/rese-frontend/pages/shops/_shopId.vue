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
      <p class="individual-shop__course-header">コース一覧</p>
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

<script>
  export default {
    async asyncData({$axios, $getTodaysDate, params, query}) {
      /* 店舗データ取得 */
      const res = await $axios.$get(`/api/shops/${params.shopId}`);
      const shop = res.data;
      const today = $getTodaysDate();

      return {
        shop: shop,
        courses: shop.courses ? shop.courses: [],
        today: today,
        /* クエリパラメータのdtがあればその値をセット、なければ今日の日付 */
        date: (query.dt) ? query.dt : today,
        /* クエリパラメータのtm、nmがunselected以外であればその値をセット(遷移前のinputの値を復元) */
        time: (query.tm !== 'unselected') ? query.tm : '',
        number: (query.nm !== 'unselected') ? query.nm : '',
        selectedCourseIndex: (query.sc !== 'unselected') ? query.sc: '',
        errors: {
          datetime: null,
          number: null,
        },
      };
    },
    methods: {
      /* 予約情報を登録 */
      async registerReservation() {
        /** ログインしていない場合はログイン画面に遷移
         *  ログインして戻ってきたあとに入力値を復元できるよう、クエリパラメータを活用
         **/
        if (!this.$store.state.user) {
          this.$router.push(
            {
              path: '/login',
              query: {
                sh: this.shop.id,
                dt: this.date,
                tm: (this.time) ? this.time : 'unselected',
                nm: (this.number) ? this.number: 'unselected',
                sc: (this.selectedCourseIndex) ? this.selectedCourseIndex: 'unselected',
              }
            }
          );
          return;
        }
        /* 入力値から送信用データを作成 */
        const sendData = {
          user_id: this.$store.state.user.id,
          shop_id: this.shop.id,
          datetime: (this.date && this.time) ? `${this.date} ${this.time}` : '',
          number: this.number?.slice(0, -1),
          course_id: this.courses[this.selectedCourseIndex]?.id,
        }

        try {
          /* 予約実行 */
          const res =  await this.$axios.post('/api/reservations', sendData);

          const query = {};
          /* コースが選択されている場合は、新規予約のIDを遷移先のクエリパラメータに設定し、/doneの表示を制御 */
          if (sendData.course_id) {
            query.rs = res.data.newData.id;
          }

          /* クエリパラメータのdt、tm、nmに値がある場合はクエリパラメータのchを1に設定し、/doneからの遷移先を制御 */
          if (this.$route.query.dt && this.$route.query.tm && this.$route.query.nm) {
            query.ch = 1;
          }
          this.$router.push({path: '/done', query: query});
        } catch (error) {
          this.errorHandling(error.response);
        }
      },
    },
  }
</script>
