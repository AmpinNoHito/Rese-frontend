<template>
  <div class="auth">
    <form class="auth__form">
      <p class="auth__form-title">Login</p>
      <div class="auth__form-inner">
        <InputAuth
          :labelImage="require('~/assets/images/icon-email.png')"
          inputType="email"
          inputId="email"
          inputPlaceholder="Email"
          v-model="form.email"
          :errors="errors.email"/>
        <InputAuth
          :labelImage="require('~/assets/images/icon-password.png')"
          inputType="password"
          inputId="password"
          inputPlaceholder="Password"
          v-model="form.password"
          :errors="errors.password"/>
        <ButtonBasic class="auth__button" @clicked="login">ログイン</ButtonBasic>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { user, sendData } from '~/types/api';
import { errorsObject } from '~/types/errors';

export default Vue.extend({
  data() {
    return {
      form: {
        email: '' as string,
        password: '' as string,
      } as sendData,
      errors: {
        email: [],
        password: [],
      } as errorsObject,
    };
  },
  methods: {
    async login(): Promise<void> {
      try {
        /* ログイン処理 */
        const token: string = await this.$repositories.user.login(this.form);
        this.$accessor.setToken(`Bearer ${token}`);

        const user: user = await this.$repositories.user.getUser();
        this.$accessor.setUser(user);
        /** 予約画面から遷移してきた場合は予約画面に戻る 
         *  入力情報を復元できるようにクエリパラメータを渡す
         */
        const query = this.$route.query;
        if (Object.keys(query).length) {
          this.$router.push({
            path: `/shops/${query.sh}`,
            query: {
              dt: query.dt as string, // 日付(date)
              tm: query.tm as string, // 時間(time)
              nm: query.nm as string, // 人数(number)
              sc: query.sc as string, // コース(selected course)
            }
          });
        } else {
          this.$router.push('/');
        }
      } catch (error: any) {
        this.errors = this.$errorHandling(Object.keys(this.errors), error.response);
      }
    },
  },
});
</script>