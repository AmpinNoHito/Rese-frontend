<template>
  <div class="auth">
    <form class="auth__form">
      <p class="auth__form-title">Representative Registration</p>
      <div class="auth__form-inner">
        <InputAuth
          :labelImage="require('~/assets/images/icon-user.png')"
          labelFor="name"
          inputType="text"
          inputId="name"
          inputPlaceholder="Representative's name"
          v-model="form.name"
          :errors="errors.name"/>
        <InputAuth
          :labelImage="require('~/assets/images/icon-email.png')"
          labelFor="email"
          inputType="email"
          inputId="email"
          inputPlaceholder="Representative's Email"
          v-model="form.email"
          :errors="errors.email"/>
        <InputAuth
          :label-image="require('~/assets/images/icon-password.png')"
          label-for="password"
          inputType="password"
          inputId="password"
          inputPlaceholder="Password"
          v-model="form.password"
          :errors="errors.password"/>
        <ButtonBasic class="auth__button" @clicked="register">登録</ButtonBasic>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import administrator from '~/middleware/administrator';
import { sendData } from '~/types/api';
import { errorsObject } from '~/types/errors';

export default Vue.extend({
  middleware: [administrator],
  data(){
    return {
      form:{
        name: '',
        email: '',
        password: '',
      } as sendData,
      errors: {
        name: [],
        email: [],
        password: [],
      } as errorsObject,
    }
  },
  methods:{
    async register(): Promise<void> {
      try {
        /* 新規店舗代表者登録処理 */
        await this.$repositories.user.registerRepresentative(this.form);
        alert('新規店舗代表者が登録されました。\nアドレス検証用のメールをご確認いただくよう、代表者にお伝えください。');
        Object.keys(this.form).forEach(key => this.form[key] = '');
      } catch (error: any) {
        this.errors = this.$errorHandling(Object.keys(this.errors), error.response);
      }
    },
  }
});
</script>