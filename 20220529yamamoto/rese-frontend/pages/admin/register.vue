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
import { errors } from '~/types/errors';
import { authData } from '~/types/pageData';

export default Vue.extend({
  middleware: [administrator],
  data(){
    return {
      form:{
        name: '',
        email: '',
        password: '',
      },
      errors: {
        name: [],
        email: [],
        password: [],
      },
    } as authData;
  },
  methods:{
    async register(): Promise<void> {
      try {
        /* 新規店舗代表者登録処理 & フォーム初期化 */
        this.form = await this.$service.auth.registerRepresentative(this.form);
      } catch (error: any) {
        this.errors = this.$handleError(Object.keys(this.errors), error.response);
      }
    },
  }
});
</script>